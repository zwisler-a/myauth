module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://auth.zwisler.dev/',
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
