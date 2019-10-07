let Seller = require('../models/sellerSchema');
let Product = require('../models/productSchema');
let Photo = require('../models/photoSchema');
let path = require('path');
let multer = require('multer');
let async = require('async');

/************* get the form upload page on GET ***********/
module.exports.get_upload_page = function(req, res, next) {
    res.render("product_upload", {title: "Upload your add"});
};

let destination = path.resolve(__dirname, '../public/uploads');

// Create the multer disk storage object
let diskStorage = multer.diskStorage(
    {
        destination: function(req, file, callback) {
            callback(null, destination);
        },
        filename: function(req, file, callback) {
            callback(null, file.fieldname + Date.now() + path.extname(file.originalname));
        }
    }
);

// define the image filter
function fileFilter(req, file, callback) {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/gif" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"){
        callback(null, true);
    } else {
        callback(null, false);
    }
}

let upload = multer({storage: diskStorage, fileFilter: fileFilter} ).array('photos', 8);

/************* upload files to the server on POST *****/
// this is the array of middleware's for  and creation of product
module.exports.upload_product = [

    // this middleware catches an error in case someone try to upload more than required photos
    function(req, res, next) {
        upload(req, res, function(error) {
            if(error) {
                if (error.name === "MulterError"
                    && error.message === 'Unexpected field'
                    && error.code === 'LIMIT_UNEXPECTED_FILE') {
                    console.log(error.message);
                    return;
                }
            }
            next();
        });
    },

    // create product, document, and seller documents
    function(req, res, next) {
        async.waterfall(
            [
                function(callback) {
                    Seller.create(
                        {
                            seller_name: req.body.seller_name,
                            phone_number: req.body.seller_phone_number,
                            seller_location: req.body.seller_location
                        },
                        function(error, result) {
                            if (error) {
                                console.log(error.message);
                                return;
                            }

                            callback(null, result);
                        }
                    );
                },
                function(seller, callback) {
                    Product.create(
                        {
                            product_name: req.body.product_name,
                            product_description: req.body.product_description,
                            product_price: req.body.product_price,
                            product_category: req.body.product_category,
                            seller: seller._id,
                            date_created: Date(),
                            isProduct: true
                        },
                        function(error, result) {
                            if (error) {
                                console.log(error.message);
                            }

                            callback(null, result);
                            
                        }
                    );
                }
            ],
            function(error, product) {
                if (error) {
                    console.log(error.message);
                    return;
                }
                // create the photo document for each uploaded photo
                async.forEach(
                    req.files,
                    function(file, callback) {
                        let photo = { photo_name: file.filename, photo_path: file.path };
                        Product.findOneAndUpdate(
                            {_id: product._id},
                            {$push: {photos_uploaded: photo }},
                            function(error, result) {
                                if(error) {
                                    console.log(error.message);
                                    return;
                                }
                                console.log('successs');
                            }
                        );
                    },
                    function(error) {
                        if(error) {
                            console.log(error.message);
                        } else {
                            console.log("Done");
                        }
                    }
                )
            }
        );
        next();
    },
    function(req, res) {
        res.send("HOOLA ALL IS OK");
    }
];



