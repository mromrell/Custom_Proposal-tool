/*
** Load the appropriate models
 */

var Contact = require('../models/contact.js');

/*
** GET requests
 */
module.exports.list = function (req, res) {
    Contact.find({}, function(err, contacts) {
        if (err) {
            res.send(err);
        }

//        contacts.forEach(function(contact) {
//            console.log('Contact found: ' + contact._id);
//        });

        res.json({
            contacts: contacts
        });
    });
};

/*
    POST requests
    Type of request is used when server-side state does not matter (e.g. state could exist, be modified or not exist)

    http://www.stormpath.com/blog/put-or-post - provides a good explanation of POST vs. PUT requests
*/
module.exports.addContact = function (req, res) {
    // Create a contact in database
    var contact = new Contact ({
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'email': req.body.email,
        'created': req.body.created
    });

    contact.save(function(err){
        if (err) {
            console.log('Error saving contact: ' + err);
            res.json({'error': 'addContact'});
        }

        res.json({
            contact: contact
        });
    });
};