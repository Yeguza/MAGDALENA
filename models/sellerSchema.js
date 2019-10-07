let mongoose = require("mongoose");

// get the schema class
let Schema = mongoose.Schema;

// create the sellerSchema
let SellerSchema = new Schema(
    {
        seller_name: {type: String},
        phone_number: {type: String},
        seller_location: {type: String, enum: ["Mwanza", "Dar es Salaam"]}
    }
);

SellerSchema.
virtual("date_created").
get(function() {
    return moment(this.date_created).format("DD-MM-YYYY");
});

// compile the Seller Schema, create a Seller model, export the model
module.exports = mongoose.model('Seller', SellerSchema);

