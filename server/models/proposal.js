var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var proposalSchema = new Schema(
    {
        id: ObjectId,
        title: String,
        description: String,
        created: Date,
        questionList: String
    },
    {
        collection: 'proposals'
    }
);
module.exports = mongoose.model('proposal', proposalSchema);