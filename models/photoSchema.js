let moment = require("moment");
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create the photo Schema
let PhotoSchema = new Schema(
    {
        photo_name: String,
        photo_path: String,
        product: {type: Schema.Types.ObjectId},
        image_size:String,
        date_uploaded: Date
    }
);
//creating a virtual property date created
PhotoSchema.
virtual("date_created").
get(function() {
        return moment(this.date_created).format("DD-MM-YYYY");
});

//export a model of the schema
module.exports = mongoose.model("Photo", PhotoSchema);
