import GitHelper from '../GitHelper';

const branchTree = (req, res) => {
    const {branch} = req.params;
    let path = req.params[0]; // params[0] - это "*" в роутере

    // убираем на конце пути "/" если есть
    const resultPath = path.match(/(.+?)\/?$/);
    path = resultPath[1];

    Promise.all([
        GitHelper.getAllBranches(),
        GitHelper.getContentTreeByPath(branch, path),
        GitHelper.getAllCommitsOfBranch(branch)
    ])
        .then(([branches, tree, commits]) => {
        // если путь после /master/tree содержит "/" значит это вложенная дерриктория
        // если не содержит, то папка выше - это корень ветки master
            const isRoot = !path.includes('/');
            let backPath;

            if (isRoot) {
                backPath = branch;
            } else {
            // если не корень, то отсекаем правую часть "/путь"
                backPath = path.match(/(.+)\/.+/);
                backPath = `${branch}/tree/${backPath[1]}`;
            }

            // добавим в элемент дерева полный путь для каждой папки/файла
            tree = tree.map(item => {
                item.path = `${path}/${item.name}`;
                return item;
            });

            // добавим 1й элемент в массив tree, для выхода их текущий директории на уровень вверх
            tree.unshift({
                first: true, // первый элемент массива - папка для подьъема по дереву
                accessMode: '040000',
                type: 'tree',
                hash: '',
                name: '..',
                path: `${backPath}`
            });

            res.render('branch', {branch, branches, tree, commits});
        })
        .catch((e) => {
            const message = e.message;
            console.log(message);
            console.log('Redirect to notFound');

            res.send('NOT FOUND');
        });
};

export default branchTree;
