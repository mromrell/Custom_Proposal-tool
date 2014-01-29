var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var proposalSchema = new Schema(
    {
        id: ObjectId,
        email: String,
        title: String,
        description: String,
        questiontitle: String,
        qtemplate: String,
        created: Date
    },
    {
        collection: 'proposals'
    }
);
module.exports = mongoose.model('proposal', proposalSchema);