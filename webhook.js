let http = require('http')
let crypto = require('crypto')
const SECRET = "qwer1234@!~"

function sign(body) {
    return `sha1=` + crypto.createHmac('sha1', SECRET).update(body).digest('hex');
}

let server = http.createServer(function (req, res) {
    console.log(req.method.req.url)
    if (req.method == 'POST' && req.url == '/webhook') {
        let buffers = []
        req.on('data', function (buffer) {
            buffers.push(buffer)
        })
        req.on('end', function (buffer) {
            let body = Buffer.concat(buffers)
            let event = req.header['x-gitHub-event']
            let signature = req.headers['x-hub-signature']
            if (signature !== sign(body)) {
                return res.end("Not Allowed")
            }
        })
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ ok: true }))
    } else {
        res.end('Not Found')
    }
})

server.listen(4000, () => {
    console.log('webhook server port 4000 launch success...')
})