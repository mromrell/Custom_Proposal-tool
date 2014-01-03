module.exports = function(app, auth, contact) {
    app.get('/api/contacts', auth, contact.list);
//    app.get('/api/contact/:id', auth, contact.contact);
    app.post('/api/contact', auth, contact.addContact);
//    app.put('/api/contact/:id', contact.editPost);
//    app.delete('/api/post/:id', contact.deletePost);
}
