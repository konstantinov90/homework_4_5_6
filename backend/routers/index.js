const GitHandler = require('../GitHandler');

const index = (req, res) => {
    Promise.resolve()
        .then(GitHandler.getDefaultBranch)
        .then((defaultBranch) => {
            res.redirect(`/${defaultBranch}`);
        })
        .catch(console.log);
};

module.exports = index;
