const GitHandler = require('../GitHandler');

const commitBlob = (req, res) => {
    const {hash} = req.params;
    let path = req.params[0]; // params[0] - это "*" в роутер

    Promise.all([
        GitHandler.getAllBranches(),
        GitHandler.getBlobContent(hash, path)
    ])
        .then(([branches, content]) => {

            const isRoot = !path.includes('/');
            let backUrl;

            if (isRoot) {
                backUrl = `commit/${hash}`;
            } else {
                // если не корень, то отсекаем правую часть "/путь"
                backUrl = path.match(/(.+)\/.+/);
                backUrl = `commit/${hash}/tree/${backUrl[1]}`;
            }

            // В content может лежать дерево, если не правильно указать путь.
            // т.к. конструкция git show hash:./path показывает и содержимое и дерево в зависимости от типа hash.
            // Обработаем этот момент.
            const isTree = content.slice(0, 4) === 'tree';

            if (isTree) {
                res.redirect('/notFound');
            } else {
                res.render('blobContent', {backUrl, branches, content});
            }
        })
        .catch((e) => {
            const message = e.message;
            console.log(message);
            console.log('Redirect to notFound');

            res.redirect('/notFound');
        });
};

module.exports = commitBlob;
