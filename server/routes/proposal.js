module.exports = function(app, auth, proposal) {
    app.get('/api/proposal', auth, proposal.list);
    app.get('/api/proposal/:id', auth, proposal.proposal);
    app.post('/api/proposal', auth, proposal.addProposal);   //////
//    app.put('/api/proposal/:id', proposal.editPost);
//    app.delete('/api/post/:id', proposal.deletePost);
}
