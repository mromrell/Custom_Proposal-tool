var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var contactSchema = new Schema(
    {
        id: ObjectId,
        email: String,
        first_name: String,
        last_name: String,
        created: Date
    },
    {
        collection: 'contacts'
    }
);

module.exports = mongoose.model('contact', contactSchema);