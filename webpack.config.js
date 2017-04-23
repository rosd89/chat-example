const path = require('path')

module.exports = {
    entry: ['./public/js/chat'], // file extension after index is optional for .js files
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    }
}