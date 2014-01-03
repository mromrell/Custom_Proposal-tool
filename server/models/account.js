var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    passportLocalMongoose = require('passport-local-mongoose');

var accountSchema = new Schema(
    {
        id: ObjectId,
        email: String,
        password: String,
        first_name: String,
        last_name: String,
        created: Date
    },
    {
        collection: 'accounts'
    }
);

accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('account', accountSchema);