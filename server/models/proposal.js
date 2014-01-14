var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var proposalSchema = new Schema(
    {
        id: ObjectId,
        email: String,
        proposal_name: String,
        description: String,
        created: Date
    },
    {
        collection: 'proposals'
    }
);

module.exports = mongoose.model('proposal', proposalSchema);