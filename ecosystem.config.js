module.exports = {
    apps: [
        {
            name: 'book-sample-generator',
            script: 'npm',
            args: 'start',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
        },
    ],
};
