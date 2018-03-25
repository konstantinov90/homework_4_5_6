const assert = require('chai').assert;
const randomInteger = require('./Helper').randomInteger;

describe('2. Работа с деревом файлов в ветке по умолчанию', () => {

    it('отображается корректный список файлов и папок поддиректории', function () {
        return this.browser
            .url('/')

            // Шаг 1. Получаем ссылку на случайную папку и заходим в нее
            .getAttribute('.content__row-folder .content__tree-item', 'href')
            .then((href) => {
                // будем переходить в случайную папку
                const randomIndex = randomInteger(0, href.length - 1);
                return href[randomIndex];
            })
            .then(this.browser.url)

            // Шаг 2. Проверим, что существует покрайне мере по 1шт элементов дерева в данной папке
            // и попрежнему отображается список комитов, путем нахождения кол-ва комитов и что их больше 1шт.
            .then(() => {
                return Promise.all([
                    this.browser.elements('.content__tree-row')
                        .then(elements => {
                            const length = elements.value.length;
                            assert.isAtLeast(length, 1, 'Отсутствуют элементы поддерева');
                        }),
                    this.browser.elements('.content__commits-row')
                        .then(elements => {
                            const length = elements.value.length;
                            assert.isAtLeast(length, 1, 'Комиты отсутствуют');
                        }),
                ]);
            })

            // Шаг 3. на текущей странице все проверено, пора подняться в родительскую папку
            .click('.content__tree-back')

            // Шаг 4. снова проверим на наличие элементов дерева и списка комитов
            .then(() => {
                return Promise.all([
                    this.browser.elements('.content__tree-row')
                        .then(elements => {
                            const length = elements.value.length;
                            assert.isAtLeast(length, 1, 'Отсутствуют элементы дерева');
                        }),
                    this.browser.elements('.content__commits-row')
                        .then(elements => {
                            const length = elements.value.length;
                            assert.isAtLeast(length, 1, 'Комиты отсутствуют');
                        }),
                ]);
            });
    });
});
