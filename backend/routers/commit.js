import GitHelper from '../GitHelper'

const commit = (req, res) => {
    const {hash} = req.params;

    Promise.all([
        GitHelper.getAllBranches(),
        GitHelper.getContentTreeByPath(hash, '/')
    ])
        .then(([branches, tree]) => {
            res.render('commit', {hash, branches, tree});
        });
};

export default commit;
