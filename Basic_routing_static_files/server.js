const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter {};

// init object
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath, 
            !contentType.includes('image') ? 'utf-8' : ''
        );
        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;

        response.writeHead(
            filePath.includes('404.html') ? 404 : 200, 
            { 'Content-Type': contentType }
        );

        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (err) {
        console.log(err);
        myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    //console.log(req.socket, req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    // chain ternary statments
    let filePath =
    contentType === 'text/html' && req.url === '/'
        ? path.join(__dirname, 'views', 'index.html')
        : contentType === 'text/html' && req.url.slice(-1) === '/'
            ? path.join(__dirname, 'views', req.url, 'index.html')
            : contentType === 'text/html'
                ? path.join(__dirname, 'views', req.url)
                : path.join(__dirname, req.url);

    // makes .html extensions not required
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        // 202 to file
        serveFile(filePath, contentType, res);
    } else {
        // 404 not found
        // 301 redirect
        //console.log(path.parse(filePath));
        
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, {'location': '/index.html'});
                res.end();
                break;
            default:
                // 404 response
                serveFile(path.join(__dirname, 'views', '404.html'), contentType, res);
        }
    }
})

server.listen(PORT, () => console.log(`server running on port ${PORT}`));


//add listener for the log event
//myEmitter.on('log', (msg) => logEvents(msg));