const cache = require('../../config').CacheConfigurations;
const statusCodes = require('../../config').StatusCodes;


module.exports = (req, res, next) => {

    if (req.method != 'GET') cache.clear()

    if ( cache.get(req.originalUrl) ) {
        res.locals.message = `${statusCodes.ok.msg} | Send by cache`; 
        res.status(statusCodes.ok.code).send(cache.get(req.originalUrl))
        return;
    } 
    else next()
  };