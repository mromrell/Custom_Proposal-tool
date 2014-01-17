module.exports = function(app, auth, proposal) {
    app.get('/api/proposals', auth, proposal.list);
//    app.get('/api/proposals/:id', auth, proposal.proposal);
    app.post('/api/proposals', auth, proposal.addProposal);
//    app.put('/api/proposals/:id', proposal.editPost);
//    app.delete('/api/proposals/:id', proposal.deleteProposal);
}
