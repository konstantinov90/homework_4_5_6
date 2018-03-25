const assert = require('chai').assert;

describe('0. Title страницы', () => {
    it('должен = "My Node.js"', function() {
        return this.browser
            .url('/')
            .getTitle().then(function(title) {
                assert.equal(title, 'My Node.js')
            })
    });
});