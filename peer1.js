const chatBtn = document.getElementById('chatBtn');
const muteAudio = document.getElementById('muteAudio');
const muteVideo = document.getElementById('muteVideo');
const stopCall = document.getElementById('stopCall');


const typing = document.getElementById('typing');
const chatBox = document.getElementById('chatBox');
const closeChat = document.getElementById('closeChat');

const connect = document.getElementById('connect');

const butt = document.getElementById('butt');
const p1SendBtn = document.getElementById('p1SendBtn');
const p1StartBtn = document.getElementById('p1StartBtn');


const videoCall = document.getElementById('videoCall');
const theirVideo = document.getElementById('theirVideo');
const myVideo = document.getElementById('myVideo');


// .style.background = 'red'
chatBtn.addEventListener('click', () => {
    chatBox.style.display = 'block'
    myVideo.style.display = 'none'
})
closeChat.addEventListener('click', () => {
    chatBox.style.display = 'none'
    myVideo.style.display = 'block'
})


p1SendBtn.addEventListener('click', () => {
    p1SendBtn.style.background = 'red'
    sendData({type: "store_user"});
});

const sendData = (data) => {
    data.username = username
    webSocket.send(JSON.stringify(data))
}

let myStream
let peerConnect
p1StartBtn.addEventListener('click', () => {
    connect.classList.add('hidden')
    videoCall.classList.remove('hidden')
    videoCall.classList.add('lg:flex');

    navigator.getUserMedia({
        video: true,
        audio: true
    }, (stream) => {
        myStream = stream
        myVideo.srcObject = myStream

        let configuration = {
            iceServers: [
                {
                    "urls": [
                        "stun:stun.l.google.com:19302",
                        "stun:stun1.l.google.com:19302",
                        "stun:stun2.l.google.com:19302"
                    ]
                }
            ]
        }

        peerConnect = new RTCPeerConnection(configuration)
        peerConnect.addStream(myStream)

        peerConnect.onaddStream = (e) => {
            theirVideo.srcObject = e.stream
        }

        peerConnect.onicecandidate = (e) => {
            if(e.candidate == null){
                return
            }
            sendData({
                type: "store_candidate",
                candidate: e.candidate
            });
        }

        offerDelivery()
    },
    (error) => {
        console.log(error)
    })

});

// const offerDelivery = (e) => {
//     peerConnect.createOffer((offer) => {
//         sendData({
//             type: "store_offer",
//             offer: offer
//         });

//         peerConnect.setLocalDescription(offer)
//         error => {
//             console.log(error)
//         }
//     })
// }






// ============== MUTE AUDIO ========================

muteAudio.addEventListener('click', () => {
    muteAudio.classList.toggle('bg-white')
    if(muteAudio.classList.contains('bg-white')){
    myStream.getAudioTracks()[0].enabled = false
    muteAudio.firstElementChild.setAttribute('color', 'black')
    } else {
        myStream.getAudioTracks()[0].enabled = true
        muteAudio.firstElementChild.setAttribute('color', '#ffffff')
    }
})

// ================= MUTE VIDEO ==============================

muteVideo.addEventListener('click', () => {
    muteVideo.classList.toggle('bg-white')
    if(muteVideo.classList.contains('bg-white')){
    myStream.getVideoTracks()[0].enabled = false
    muteVideo.firstElementChild.setAttribute('color', '#000000')
    } else {
        myStream.getVideoTracks()[0].enabled = true
        muteVideo.firstElementChild.setAttribute('color', '#ffffff')
    }
})