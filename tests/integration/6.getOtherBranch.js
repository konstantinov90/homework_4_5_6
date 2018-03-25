const assert = require('chai').assert;
const randomInteger = require('./Helper').randomInteger;

describe('3. Содержимого файла в ветке по умолчанию', () => {

    it('отображается корректно', function () {
        return this.browser
            .url('/')
            // Шаг 1. Найдем список ссылок на blob файлы и зайдем на один из них
            .getAttribute('.content__row-blob .content__tree-item', 'href')
            .then(href => {
                const randomIndex = randomInteger(0, href.length - 1);
                return href[randomIndex];
            })
            .then(this.browser.url)

            // Шаг 2. проверим, что содержимое blob файла это строка
            .getText('.content__blob')
            .then(text=> {
                assert.isString(text, 'Нет содержимого файла');
            });
    });
});
