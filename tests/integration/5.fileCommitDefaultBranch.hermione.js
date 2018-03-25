const assert = require('chai').assert;

describe('5. Содержимое файла комита для ветки по умолчанию', () => {

    it('отображается корректно', function () {
        return this.browser
            .url('/')
            // Шаг 1. находим ссылку на 1ю ссылку комита и заходим
            .getAttribute('.content__commit-link', 'href')
            .then((href) => href[0]) // последний комит
            .then(this.browser.url)
            // Шаг 2. находим ссылку на 1ю папку комита и заходим
            .getAttribute('.content__row-folder .content__tree-item', 'href')
            .then(href => href[0]) // первая папка - backend
            .then(this.browser.url)
            // Шаг 3. находим ссылку на 3й файл и открываем его
            .getAttribute('.content__row-blob .content__tree-item', 'href')
            .then(href => href[2]) // 3й файл - GitHandler.j
            .then(this.browser.url)
            // Шаг 4. Читаем его содержимое, ожидаем строку
            .getText('.content__blob')
            .then(text=> {
                assert.isString(text, 'Нет содержимого файла');
            })
            // Шаг 5. Закрываем файл (поднимаемся в корневую папку этого файла)
            .getAttribute('.content__tree-back', 'href')
            .then((href)=>this.browser.url(href))
            // Шаг 6.1. Проверяем, что отображается корректный список файлов и папок
            .isExisting('.content__tree')
            .then((exist) => {
                assert.ok(exist, 'Отсутствует дерево папки');
            })
            // Шаг 6.2 Убедимся, что контейнер content__tree действительно
            // содержит строки (как файлов так и дирректорий)
            .then(() => {
                Promise.all([
                    this.browser.elements('.content__row-folder')
                        .then(folders => folders),
                    this.browser.elements('.content__row-blob')
                        .then(blobs => blobs),
                ])
                    .then(([folders, blobs]) => {
                        const countElements = folders.value.length + blobs.value.length;
                        assert.isAtLeast(countElements, 1, 'Нет элементов в дереве комита');
                    });
            });
    });
});
