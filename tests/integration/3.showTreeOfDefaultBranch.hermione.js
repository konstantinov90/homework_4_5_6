const assert = require('chai').assert;
const randomInteger = require('./Helper').randomInteger;

describe('3. Содержимого файла в ветке по умолчанию', () => {

    it('отображается корректно', function () {
        return this.browser
            .url('/')
            .elements('.content__row-blob-folder')
            .getAttribute('.content__row-blob .content__tree-item', 'href')
            .then(href => {
                const randomIndex = randomInteger(0, href.length - 1);
                return href[randomIndex];
            })
            .then(this.browser.url)
            .getText('.content__blob')
            .then(text=> {
                assert.isString(text, 'Нет содержимого файла');
            });
    });
});
