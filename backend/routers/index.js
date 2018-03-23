import GitHelper from '../GitHelper'

const index = (req, res) => {
    Promise.resolve()
        .then(GitHelper.getDefaultBranch)
        .then((defaultBranch) => {
            res.redirect(`/${defaultBranch}`);
        })
        .catch(console.log);
};

export default index;
