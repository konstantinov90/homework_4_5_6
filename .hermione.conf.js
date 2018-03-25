module.exports = {
    baseUrl: 'http://0.0.0.0:8080',
    gridUrl: 'http://0.0.0.0:4444/wd/hub',

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        },
        // firefox: {
        //     desiredCapabilities: {
        //         browserName: 'firefox'
        //     }
        // }
    }
};