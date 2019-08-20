module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3333/',
                secure: false
            }
        }
    },
    chainWebpack: config => {
        // remove the prefetch plugin
        config.plugins.delete('prefetch');
        config.plugins.delete('preload');
    }
};
