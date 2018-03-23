const transformStringCommitsToArray = (commits) => {
    // преобразовываем весь список комитов в массив
    commits = commits.split('\n');

    // приводим данные о коммитах в объект с соответствующими ключами (hash, title, author, date)
    commits = commits.map(item => {
        const result = item.split(',');

        return {
            hash: result[0],
            title: result[1],
            committer: result[2],
            date: result[3]
        };
    });

    return commits;
};

export default transformStringCommitsToArray;
