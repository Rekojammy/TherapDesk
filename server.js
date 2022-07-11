const Socket = require("websocket").server
const http = require("http")

const server = http.createServer((req, res) => { })

server.listen(5500, () => {
    console.log("Listening on port 5500...")
})

const webSocket = new Socket({ httpServer: server })

let peers = []

webSocket.on('request', (req) => {
    const connection = req.accept()

    connection.on('message', (message) => {
        const data = JSON.parse(message.utf8Data)

        const peer = findUser(data.username)

        switch (data.type) {
            case "store_user":

                if (peer != null) {
                    return
                }

                const newUser = {
                    conn: connection,
                    username: data.username
                }

                peers.push(newUser)
                console.log(newUser.username)
                break
            case "store_offer":
                if (peer == null)
                    return
                peer.offer = data.offer
                break

            case "store_candidate":
                if (peer == null) {
                    return
                }
                if (peer.candidates == null)
                    peer.candidates = []

                peer.candidates.push(data.candidate)
                break
            case "send_answer":
                if (peer == null) {
                    return
                }

                sendData({
                    type: "answer",
                    answer: data.answer
                }, peer.conn)
                break
            case "send_candidate":
                if (peer == null) {
                    return
                }

                sendData({
                    type: "candidate",
                    candidate: data.candidate
                }, peer.conn)
                break
            case "join_call":
                if (peer == null) {
                    return
                }

                sendData({
                    type: "offer",
                    offer: peer.offer
                }, connection)

                peer.candidates.forEach(candidate => {
                    sendData({
                        type: "candidate",
                        candidate: candidate
                    }, connection)
                })

                break
        }
    })

    connection.on('close', (reason, description) => {
        peers.forEach(peer => {
            if (peer.conn == connection) {
                peers.splice(peers.indexOf(peer), 1)
                return
            }
        })
    })
})

function sendData(data, conn) {
    conn.send(JSON.stringify(data))
}

function findUser(username) {
    for (let i = 0; i < peers.length; i++) {
        if (peers[i].username == username)
            return peers[i]
    }
}