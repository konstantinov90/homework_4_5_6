const sortTreeByType = (arr) => {
    return arr.sort( (a,b) => {
        // первым делом сортируем по типу элемента дерева.
        if(a.type < b.type) {
            return 1
        } else if (a.type > b.type) {
            return -1
        } else {
            // если мы дошли до сюда, значит оба элемента с одинаковым типом, сортируем по имени
            return a.name > b.name
        }
    })
};

export default sortTreeByType;