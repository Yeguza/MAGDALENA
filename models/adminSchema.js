let mongoose = require('mongoose');
let moment = require('moment');

// get the Schema class
let Schema = mongoose.Schema;

// create the admin schema
let AdminSchema = new Schema(
    {
        first_name: {type: String, required: true},
        middle_name: {type: String, required: true},
        last_name: {type: String, required: true},
        role: {type: String, required: true},
        date_created: {type: Date}
    }
);

// create the virtual prop to return the formatted date
AdminSchema.
    virtual("date_created").
    get(function() {
        return moment(this.date_created).format("DD-MM-YYYY");
});

// create the virtual prop to return the full name of the admin
AdminSchema.
    virtual("full_name").
    get(function() {
        return this.first_name + " " + this.middle_name + " " + this.last_name;
});



