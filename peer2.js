const chatBtn = document.getElementById('chatBtn');
const muteAudio = document.getElementById('muteAudio');
const muteVideo = document.getElementById('muteVideo');
const stopCall = document.getElementById('stopCall');


const typing = document.getElementById('typing');
const chatBox = document.getElementById('chatBox');
const closeChat = document.getElementById('closeChat');

const connect = document.getElementById('connect');

const butt = document.getElementById('butt');
// const p1SendBtn = document.getElementById('p1SendBtn');
const joinCall = document.getElementById('joinCall');


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


joinCall.addEventListener('click', () => {
    connect.classList.add('hidden')
    videoCall.classList.remove('hidden')
    videoCall.classList.add('lg:flex');

    navigator.getUserMedia({
        video: true,
        audio: true
    }, (stream) => {
        localStream = stream
        myVideo.srcObject = localStream

        let configuration = {
            iceServers: [
                {
                    "urls": ["stun:stun.l.google.com:19302", 
                    "stun:stun1.l.google.com:19302", 
                    "stun:stun2.l.google.com:19302"]
                }
            ]
        }

        peerConn = new RTCPeerConnection(configuration)
        peerConn.addStream(localStream)

        peerConn.onaddstream = (e) => {
            theirVideo.srcObject = e.stream
        }

        peerConn.onicecandidate = ((e) => {
            if (e.candidate == null)
                return
            
            sendData({
                type: "send_candidate",
                candidate: e.candidate
            })
        })

        sendData({
            type: "join_call"
        })

    }, (error) => {
        console.log(error)
    })

});






// ============== MUTE AUDIO ========================

muteAudio.addEventListener('click', () => {
    muteAudio.classList.toggle('bg-white')
    if(muteAudio.classList.contains('bg-white')){
    myStream.getAudioTracks()[0].enabled = false
    muteAudio.firstChild.setAttribute('color', '#000000')
    } else {
        myStream.getAudioTracks()[0].enabled = true
        muteAudio.firstChild.setAttribute('color', '#ffffff')
    }
})
muteVideo.addEventListener('click', () => {
    muteVideo.classList.toggle('bg-white')
    if(muteVideo.classList.contains('bg-white')){
    myStream.getVideoTracks()[0].enabled = false
    muteVideo.firstChild.setAttribute('color', '#000000')
    } else {
        myStream.getVideoTracks()[0].enabled = true
        muteVideo.firstChild.setAttribute('color', '#ffffff')
    }
})