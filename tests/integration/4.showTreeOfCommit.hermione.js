const assert = require('chai').assert;
const randomInteger = require('./Helper').randomInteger;

describe('4. Дерево файлов комита', () => {

    it('отображается корректно', function () {
        return this.browser
            .url('/')

            // Шаг 1. Получаем ссылки на комиты и заходим на один из них
            .getAttribute('.content__commit-link', 'href')
            .then((href) => {
                const randomIndex = randomInteger(0, href.length - 1);
                return href[randomIndex];
            })
            .then(this.browser.url)

            // Шаг 2. Проверяем, что на странице есть как минимум 1 элемент
            // который может быть как директорией так и blob файлом
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
            })

            // Шаг 3. Перейдем в каталог (случайны)
            .getAttribute('.content__row-folder .content__tree-item', 'href')
            .then((href) => {
                const randomIndex = randomInteger(0, href.length - 1);
                return href[randomIndex];
            })
            .then(this.browser.url)

            // Шаг 4. Повторим шаг 2 и проверим наличие хотя бы 1 элемента в списке дерева
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
            })

            // Шаг 5. Поднимаемся на директорию выше
            .click('.content__tree-back')

            // Шаг 6. Повторим шаги 2 и 4 и проверим наличие хотя бы 1 элемента в списке дерева)
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
