const express = require("express")
const cookieParser = require("cookie-parser")
const fs = require("fs")
const server = express()
server.use(cookieParser())
server.use(express.static("client"))
server.use(express.urlencoded())
server.use(express.json())

server.get("/highscore", (req, res) => {
    res.send(req.cookies.name)
})

server.post("/highscore", (req, res) => {
    console.log(req.body)
    const file = JSON.parse(fs.readFileSync('highscore.json', { encoding: 'utf-8' }))
    console.log(file)
    if (req.body.score < file.score) {
        fs.writeFileSync('highscore.json', JSON.stringify(req.body))
        res.json({ msg: "Highscore Saved" })
    } else {
        res.json({ msg: "highscore not saved" })
    }
})

server.listen(3000)