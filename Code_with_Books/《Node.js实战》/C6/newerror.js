const env = process.env.NODE_ENV || 'development';

function errorHandler(err, req, res, next) {
    res.statusCode = 500;
    switch(env) {
        case 'development':
            console.error('Error:');
            console.error(err);
            res.setHeader('Content-Type','text/plain');
            res.end(err.toString());
            break;
        default:
            res.end('Server Error');
    }
}

module.exports = errorHandler;