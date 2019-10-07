let mongoose  = require("mongoose");
let moment = require('moment');
let categories = [
                     "Cellphones & smartphones", "Laptop & Notebooks", "Desktop & Components", "Networking & Servers", "Cameras & Drones",
                     "Printers & Scanners", "Tv's & Components", "Routers", "PortableAudio & Headphones"
                 ];

let Schema = mongoose.Schema;   // getting the Schema class

// Creating our product schema
let ProductSchema = new Schema(
    {
        product_name: {type: String, maxlength: 100, minlength: 1},
        product_description: {type: String},
        product_price: {type: String},
        product_category: {type: String, enum: categories},
        seller: {type: Schema.Types.ObjectId, ref: "Seller"},
        photos_uploaded: [],
        date_created: Date,
        isProduct: Boolean
    }
);

// create the virtual prop to get the formatted date created
ProductSchema.
    virtual("get_date_created").
    get(function() {
        return moment(this.date_created).format("DD,MMM,YYYY, h:mm:ss a");
});


ProductSchema.
    virtual("get_duration").
    get(function() {
        return moment(this.date_created).fromNow();
});


// compile the Schema, create the Product model, export it
module.exports = mongoose.model("Product", ProductSchema);

