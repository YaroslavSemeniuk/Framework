module.exports = (req, callback) => {
    let body = ''
    req.on('data', (chunk) => {
        body += chunk
    })
   req.on('end', () => {
        if (body) req.body = JSON.parse(body)
       callback(req)
    })
}
