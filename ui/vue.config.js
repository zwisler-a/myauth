module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "https://auth.zwisler.dev/",
                secure: false,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
  };
