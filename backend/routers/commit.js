import getAllBranches from '../common/getAllBranches';
import getContentTreeByPath from '../common/getContentTreeByPath';
import transformStringTreeToArray from '../common/transformStringTreeToArray';
import sortTreeByType from "../common/sortTreeByType";


const commit = (req, res) => {
    const {hash} = req.params;

    Promise.all([
        getAllBranches(),
        getContentTreeByPath(hash, '/')
            .then(transformStringTreeToArray)
    ])
        .then(([branches, tree]) => {

            // сортируем в правильном порядке
            tree = sortTreeByType(tree);

            res.render('commit', {hash, branches, tree});
        });
};

export default commit;
