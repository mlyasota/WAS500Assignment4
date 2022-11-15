const port = 3000,
http = require("http"),
httpStatus = require("http-status-codes"),
fs = require("fs");

const daylist = []

app = http.createServer((req, res) => {

    // Main Page
    if (req.url == '/') {var nodeUrl = 'views/index.html'}
    // Images
    else if (req.url.includes(".jpg") || req.url.includes(".ico")) {var nodeUrl = `public${req.url}`} 
    // All other .html
    else {var nodeUrl = `views${req.url}`}

    fs.readFile(nodeUrl, (error, data) => {
        if (error) {
            console.log(`An error occurred. Request for page "${req.url}" could not be found on the server on [${new Date().toLocaleDateString()}] at [${new Date().toLocaleTimeString()}]`)
            res.writeHead(httpStatus.NOT_FOUND);
            res.write(` <head>
                            <title>WAS500</title>
                            <link rel="icon" type="image/x-icon" href="images/favicon2.ico" />
                            <h1>404</h1>
                            <h3>Page not found</h3>
                        </head>`);
            
        } else {
            console.log(`Request received for page "${req.url}" on [${new Date().toLocaleDateString()}] at [${new Date().toLocaleTimeString()}]`)
            if (req.url.includes(".html")) { 
                res.writeHead(httpStatus.OK, {"Content-Type": "text/html"});
                // dynamically add header with icon to all .html files after </style>
                //  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
                //  - https://melvingeorge.me/blog/convert-string-buffer-nodejs
                let edit = data.toString() // convert buffer to string, insert header and then convert back to buffer
                edit = edit.replace('</style>', `</style>\n\n<head>\n\t<title>WAS500</title>\n\t<link rel="icon" type="image/x-icon" href="images/favicon2.ico" />\n</head>`);
                out = Buffer.from(edit, "utf-8");
                res.write(out);
            } else if (req.url.includes(".jpg")) { 
                // images failed to load if they were converted to string back to buffer so this if/else statement was added to fix that issue
                res.writeHead(httpStatus.OK, {"Content-Type": "image/jpg"});
                res.write(data);
            } else {
                res.writeHead(httpStatus.OK, {"Content-Type": "text/html"});
                res.write(data);
            }
        }
        res.end();
    });
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);