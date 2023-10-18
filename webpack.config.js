
const path = require('path');
module.exports ={
    
    mode: 'development',

    devtool:'eval-source-map',
    entry: './link.js',
    output: {
        path: path.resolve(__dirname,'dis'),
        filename: 'bundle.js'
    }
};
