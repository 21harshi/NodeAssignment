const config = {
    app: {
        port: 3000
    },
    serverArray: [
        {
            url: 'http://google.com',
            priority: 4
        },
        {
            url: 'http://doesNotExist.kratikal.com',
            priority: 7
        },
        {
            url: 'http://offline.kratikal.com',
            priority: 2
        },
        {
            url: 'http://kratikal.com',
            priority: 4
        }
    ],
    delay : 5000,
    successCode : 200
};

module.exports = config;

