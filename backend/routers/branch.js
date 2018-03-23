import GitHelper from '../GitHelper';

const path = process.env.ROOT;

const branchRouter = (req, res) => {
    const {branch} = req.params;
    let saveBranches;

    Promise.resolve()
        .then(GitHelper.getAllBranches) // получаем список всех существующих веток
        .then((branches) => {
            saveBranches = branches; // сохраняем в переменной, что бы не тащить её через промисы

            // если не существует запрошенная ветка, то выкидываем ошибку и попадаем в catch
            const isExist = branches.includes(branch);

            if (isExist) {
                return GitHelper.readFile(`${path}/.git/refs/heads/${branch}`);
            } else {
                return Promise.reject(new Error('not exist'));
            }
        })
        .then(() => {
            return Promise.all([
                GitHelper.getAllCommitsOfBranch(branch),

                // здесь по hashBranch достается список содержимого ветки (tree, parent, и тд)
                GitHelper.getContentTreeByPath(branch, '/'),
            ])
                .then(([commits, tree]) => {
                    res.render('branch', {branch, branches: saveBranches, tree, commits});
                });
        })
        .catch((e) => {
            const message = e.message;

            if (message === 'not exist') {
                res.send('NOT FOUND');
            } else {
                console.log(message);
            }
        });
};

export default branchRouter;
