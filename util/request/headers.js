    var RESPONSE_HEADERS = {
        RESPONSE_STATUS : {
            OK:200,
            NO_FOUND :404,
            INTERNAL_ERROR :500,
            TIME_OUT : 502,
            UNAVALIABLE_SERVICE : 503,
            BAG_GATEWAY : 504
         },        
        'Access-Control-Allow-Origin' : '',
        'Accept-Language' : '',
        'Authorization' : 'basic',
        CONTENT_TYPE : {
                IMAGE : {
                IMAGE_GIF : 'image/gif',
                IMAGE_PNG : 'image/png',
                IMAGE_JPEG : 'image/jpeg',
                IMAGE_SVG_XML : 'image/svg+xml',
            },
            TEXT : {
                CSS: 'text/css',
                JAVASCRIPT : 'text/javascript',
                JSON : 'application/json charset="utf-8"',
                CSV : 'text/csv',
                HTML :'text/html',
                PLAIN : 'text/plain'
                
            }
        }
    };
module.exports = RESPONSE_HEADERS;