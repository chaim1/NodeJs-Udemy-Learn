const fs = require('fs');
// fs.appendFileSync('hello.txt', 'hello from node.fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write('<body><form action="/massage" method="POST"><input type="text" name="massage"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/massage' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const massage = parsedBody.split('=')[1];
            fs.writeFile('massage.txt', massage, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Comtent-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server</h1></body>');
    res.write('</html>');
    res.end();
};

// module.exports = {
//     hendler: requestHandler,
//     someText: 'text'
// };

// module.exports.hendler = requestHandler;
// module.exports.someText = "text";

exports.hendler = requestHandler;
exports.someText = "text";