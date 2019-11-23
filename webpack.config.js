const path = require('path');

const config = {
    entry: {
        vivi: './components/index.ts',
    },
    target: 'node',
    node: {
        __dirname: true,
        __filename: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        transpileOnly: true,
                        context: __dirname,
                        configFile: 'tsconfig.json'
                    }
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,

                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
        ]
    },
    output: {
        filename: 'vivi-ui.js',
        library: 'vivi-ui',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    mode: 'production',
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['.ts', '.js', '.json']
    }
};

module.exports = [config];