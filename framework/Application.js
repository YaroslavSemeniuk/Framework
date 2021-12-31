/*
endpoint structure:
endpoint = {
    '/users': { 'GET': handler }
}
*/

const http = require('http')
const EventEmmiter = require('events')
const parseBody = require('./parseBody')

module.exports = class Application {
    constructor() {
        this.emmiter = new EventEmmiter()
        this.server = this._createServer()
        this.middlewares = []
    }

    _createServer() {
        return http.createServer(async (req, res) => {
            this.middlewares.forEach(middleware => middleware(req, res))
            parseBody(req, () => {
                const emmitted = this.emmiter.emit(this._getRouteMask(req.pathname, req.method), req, res)
                if (!emmitted) {
                    res.end()
                }
            });

        })
    }


    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path]
            Object.keys(endpoint).forEach(method => {
                this.emmiter.on(this._getRouteMask(path, method), async (req, res) => {
                    const handler = endpoint[method]
                    handler(req, res)
                })
            })
        })
    }

    listen(port, callback) {
        this.server.listen(port, callback)
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }
}