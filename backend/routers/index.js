import getDefaultBranch from '../common/getDefaultBranch';

const index = (req, res) => {
    Promise.resolve()
        .then(getDefaultBranch)
        .then((defaultBranch) => {
            defaultBranch = defaultBranch.trim();
            res.redirect(`/${defaultBranch}`)
        })
        .catch(console.log);
};

export default index;
