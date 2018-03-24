import GitHandler from '../GitHandler';

const index = (req, res) => {
    Promise.resolve()
        .then(GitHandler.getDefaultBranch)
        .then((defaultBranch) => {
            res.redirect(`/${defaultBranch}`);
        })
        .catch(console.log);
};

export default index;
