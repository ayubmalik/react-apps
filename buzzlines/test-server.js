const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router({}) // no db.json
const middlewares = jsonServer.defaults()
server.use(middlewares)

const port = 3001
// in memory db
const origins = [
    { "id": 1, "name": "Manchester" },
    { "id": 2, "name": "Bradford" },
    { "id": 3, "name": "Leeds" },
    { "id": 5, "name": "Liverpool" },
]

const destinations = {
    "1": [
        { "id": 2, "name": "Bradford" },
        { "id": 3, "name": "Leeds" },
        { "id": 4, "name": "Hull" }
    ],
    "2": [
        { "id": 3, "name": "Leeds" },
        { "id": 4, "name": "Hull" }
    ],
    "3": [
        { "id": 4, "name": "Hull" }
    ],
    "5": [
        { "id": 1, "name": "Manchester" }
    ]
}

// custom routes
server.get('/origins', (req, res) => {
    res.json(origins)
})

server.get('/destinations', (req, res) => {
    console.log("query", req.query)
    const origin = req.query.origin
    result = destinations[origin]
    if (result) {
        console.log("destinations result", result)
        res.json(result)
    } else {
        res.sendStatus(404)
    }
})

// use default router and middlewares
server.use(router)
server.listen(port, () => {
    console.log('JSON Server is running')
    console.log(`http://localhost:${port}/origins`)
    console.log(`http://localhost:${port}/destinations?origin=1`)
})