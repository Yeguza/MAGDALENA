let Product = require('../models/productSchema');
let moment = require('moment');
let async = require('async');

// get the Home page on get
module.exports.index = function(req, res, next) {
    let pipeline = [
        {
            "$match": {
                "isProduct": true
            }
        },

        {
            "$limit": 24
        },

        {
            "$sort": {
                "date_created": -1
            }
        }

    ];

    Product.aggregate(pipeline, function(error, products) {
        if (error) {
            console.log(error.name, error.message);
            return;
        }

        let product_arr = products.map(function(product) {
            product.date_created = moment(product.date_created).fromNow();
            return product;
        });

        res.render("homepage", {title: "Kumenogatz.com", products: product_arr});
    });
};

// get the category  page on GET request 
module.exports.get_products_from_category = function(req, res, next) {
    let category = req.params.category_name;

    let pipeline = [
        {
            "$match": { // find the products by category
                'product_category': category
            }
        },

        {
            "$sort": {// sort the product recent-old
                'date_created': -1
            }
        },

        {// limit the number of products sent to the client
            "$limit": 2
        }
    ];


    // perform some parallel async requet for category count and category page creation
    async.parallel(
        {
            "one": function(callback) {
                Product.countDocuments({product_category: category}, function(error, count) {
                    if (error) {
                        callback(error, null);
                        return;
                    }
                    callback(null, count);
                });
            },

            "two": function(callback) {
                Product.aggregate(pipeline, function(error, products) {
                    if (error) {
                        callback(error, null);
                        return;
                    }

                    let product_arr = products.map(function(product) {
                        product.date_created = moment(product.date_created).fromNow();
                        return product;
                    });

                    callback(null, product_arr);
                });
            }
        },

        function(error, results) {
            if (error) {
                console.log(error.name, error.message);
                return;
            }

            res.render('product_list', {
                title: category,
                page_category: category, // this category data is sent and stored in html
                total_product_count: results["one"],
                products: results["two"]
            });
        }
    );
        
};


//GET request handler for product detail page
module.exports.get_product_detail = function(req, res, next) {
    let productID = req.params.product_id;
    // Query the database for the product
    Product.findOne({_id: productID}).populate('seller').exec(function(error, product) {
        if(error) {
            console.log(error.name, error.message);
            return;
        }

        res.render("product_detail", {
            title: product.product_name, 
            product: product,
            seller: product.seller,
            images: product.photos_uploaded,
            date_uploaded: product.get_duration
        });
    });

};


// get the product list on infinite scrolling
module.exports.infinity_scroll_products = function(req, res, next) {
    // steps to follow
    // use mongodB aggregate to find products
    // sort products by time uploaded
    // skip viewed products
    // limit number of products to return
    console.log("User Scrolled!!");
    let category = req.params.category_name;
    let skip_number = Number(req.params.product_skip_number);
    console.log(skip_number);
    let pipeline = [
        {
            "$match": {
                "product_category": category
            }
        },

        {
            "$sort": {
                "date_created": -1
            }
        },

        {
            "$skip": skip_number
        },

        {
            "$limit": 2
        }
    ];

    Product.aggregate(pipeline, function(error, products) {
        if (error) {
            console.log(error.name, error.message);
            return;
        }

        let product_arr = products.map(function(product) {
            product.date_created = moment(product.date_created).fromNow();
            return product;
        });

        res.render('product_loading', {products: product_arr});
    });
};


// GET team page on GET request 
module.exports.get_team_page = function(req, res, next) {
    res.render("team");
}

