module.exports = {
    entry:'./app/entry.js',
    output:{
        path: __dirname+'/public',
        filename:'bundle.js'
    },
    module:{
        preloaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader:'jshing-loader'
            }
        ],
        loaders:[
            {
                test:[/\.js$/, /\.es6$/],
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory:true,
                    presets:['react','es2015']
                }
            },
            {
                test:/\.css$/,
                loader:'style!css'
            }
        ]
    },
    resolve:{
        extensions:['', '.js', '.es6']
    }
}