/*
** Load the appropriate models
 */

var Proposal = require('../models/proposal.js');

/*
** GET requests
 */
module.exports.list = function (req, res) {
    Proposal.find({}, function(err, proposals) {
        if (err) {
            res.send(err);
        }

//        proposals.forEach(function(proposal) {
//            console.log('Proposal found: ' + proposal._id);
//        });

        res.json({
            proposals: proposals
        });
    });
};

/*
    POST requests
    Type of request is used when server-side state does not matter (e.g. state could exist, be modified or not exist)

    http://www.stormpath.com/blog/put-or-post - provides a good explanation of POST vs. PUT requests
*/
module.exports.addProposal = function (req, res) {
    // Create a proposal in database
    var proposal = new Proposal ({
        'proposal_name': req.body.proposal_name,
        'description': req.body.description,
        'created': req.body.created
    });

    proposal.save(function(err){
        if (err) {
            console.log('Error saving proposal: ' + err);
            res.json({'error': 'addProposal'});
        }

        res.json({
            proposal: proposal
        });
    });
};