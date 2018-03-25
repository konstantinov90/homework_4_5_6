const GitHandler = require('../GitHandler');

const commit = (req, res) => {
    const {hash} = req.params;

    Promise.all([
        GitHandler.getAllBranches(),
        GitHandler.getContentTreeByPath(hash, '/')
    ])
        .then(([branches, tree]) => {
            res.render('commit', {hash, branches, tree});
        });
};

module.exports = commit;
