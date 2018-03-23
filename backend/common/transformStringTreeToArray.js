const transformStringTreeToArray = (tree) => {
    // преобразовываем строку в массив, обрезав лишние пробелы
    tree = tree.trim().split('\n');

    tree = tree.map(item => {
        const result = item.match(/(\d+)\s(\w+)\s(.+?)\t(.+)/);

        return {
            accessMode: result[1],
            type: result[2],
            hash: result[3],
            name: result[4]
        };
    });

    // отсортируем, что бы сначало были все tree, а потом blob объекты
    tree.sort((a, b) => {
        return a.type < b.type;
    });

    return tree;
};

export default transformStringTreeToArray;
