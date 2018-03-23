import getAllBranches from '../common/getAllBranches';
import getContentTreeByPath from '../common/getContentTreeByPath';
import transformStringTreeToArray from '../common/transformStringTreeToArray';

const commitTree = (req, res) => {
    const {hash} = req.params;
    let path = req.params[0]; // params[0] - это "*" в роутере

    // убираем на конце пути "/" если есть
    const resultPath = path.match(/(.+?)\/?$/);
    path = resultPath[1];


    Promise.all([
        getAllBranches(),
        getContentTreeByPath(hash, path)
            .then(transformStringTreeToArray)
    ])
        .then(([branches, tree]) => {
            // если путь после /master/tree содержит "/" значит это вложенная дерриктория
            // если не содержит, то папка выше - это корень ветки master
            const isRoot = !path.includes('/');
            let backPath;

            if (isRoot) {
                backPath = hash;
            } else {
                // если не корень, то отсекаем правую часть "/путь"
                backPath = path.match(/(.+)\/.+/);
                backPath = `${hash}/tree/${backPath[1]}`;
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

            res.render('commit', {hash, branches, tree});
        })
        .catch(console.log);
};

export default commitTree;
