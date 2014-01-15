module.exports = function(app, auth, contact, proposal) {    // remove 'proposal' when you remove it from line 5
    app.get('/api/contacts', auth, contact.list);
//    app.get('/api/contact/:id', auth, contact.contact);
    app.post('/api/contact', auth, contact.addContact);
    app.post('/api/proposal', auth, proposal.addProposal);  // added in from the routes/proposal.js temporarily
//    app.put('/api/contact/:id', contact.editPost);
//    app.delete('/api/post/:id', contact.deletePost);
}
