const options = {
    // в myPath "/" после точки обязателен
    myPath: './', // пример "/path/path/path/"
    host: '0.0.0.0', // например "127.0.0.100"
    port: 8080,
    timeFormat: 'LLL',
    timeLocale: 'ru'
};

// timeFormat и timeLocale реализован через moment.js
// поэтому в этом поле может быть реализован любой формат из этой библиотеки
//
// http://momentjs.com/docs/#/displaying/format/

module.exports = options;
