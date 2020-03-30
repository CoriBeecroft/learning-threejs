const path = require("path");

module.exports = {
    entry: { "script": "./src/script.js" },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {},
    resolve: {
        modules: [
            "src",
            "node_modules",
        ]
    },
    plugins: []
}
