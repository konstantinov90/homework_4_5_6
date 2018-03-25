const assert = require('chai').assert;

function randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

describe('2. Работа с деревом файлов в ветке по умолчанию', () => {

    it('отображается корректный список файлов и папок поддиректории', function () {
        return this.browser
            .url('/')
            // .elements('.content__row-folder')
            .getAttribute('.content__row-folder .content__tree-item', 'href')
            .then((href) => {
                // будем переходить в случайную папку
                const randomIndex = randomInteger(0, href.length - 1);
                return href[randomIndex];
            })
            .then( (url) => this.browser.url(url))
            // .then( href => {
            //     console.log(href)
            // })
    });
    //
    // it('имеет в файловом дереве не меньше 1 элемента', function () {
    //     return this.browser
    //         .elements('.content__tree-row')
    //         .then(elements => {
    //             const length = elements.value.length;
    //             assert.isAtLeast(length, 1, `Отсутствуют элементы дерева`);
    //         });
    // });
    //
    // it('имеет кол-во комитов не меньше 1', function () {
    //     return this.browser
    //         .elements('.content__commits-row')
    //         .then(elements => {
    //             const length = elements.value.length;
    //
    //             assert.isAtLeast(length, 1, `Комиты отсутствуют`);
    //         });
    // });
});