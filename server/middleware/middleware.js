function accessLog(req, res, next) {
    const { hostname, method, path, ip, protocol } = req;
    console.log(`ACCESS: ${method} ${protocol}://${hostname}${path} - ${ip}`);
    next();
}

function errorLog(err, req, res, next) {
    const { hostname, method, path, protocol } = req;
    console.log(`ERROR: ${method} ${protocol}://${hostname}${path} - ${err}`);
    // next(); // you can call either next or send a uniform error response
    res.status(500).send({ status: "server-error", message: err.message });
}

function notFound(req, res,next){
    res.set('Content-Type', 'text/html');
    res.status(404).send('<h1>404 Not Found</h1>');
}

module.exports = { accessLog, errorLog, notFound };