import io from "socket.io-client";
const { RTCPeerConnection, RTCSessionDescription } = window;

const socket = io.connect("http://Chatty-env.eba-mvkmdhuw.us-east-1.elasticbeanstalk.com");

export { socket };

export function registerLietener(event, fn) {
  socket.on(event, fn);
}

export function emit(event, data) {
  socket.emit(event, data);
}

export async function recvOffer(peerConnection, data) {
  peerConnection.onicecandidate = (event) => {
    socket.emit("new-candidate", {
      to: data.socket,
      candidate: event.candidate,
    });
  };
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.offer)
  );
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(answer));
  socket.emit("make-answer", {
    answer,
    to: data.socket,
  });
}

// socket.on("call-made");
export async function recvAnswer(peerConnection, data) {
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.answer)
  );
}

// socket.on("answer-made");

export async function createPeerConnection(localVideoEl, remoteVideoEl) {
  const peerConnection = new RTCPeerConnection();
  peerConnection.ontrack = function ({ streams: [stream] }) {
    remoteVideoEl.srcObject = stream;
    console.log(remoteVideoEl.srcObject);
  };
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  localVideoEl.srcObject = stream;
  stream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, stream);
  });
  return peerConnection;
}

export async function callUser(peerConnection, socketId) {
  peerConnection.onicecandidate = (event) => {
    socket.emit("new-candidate", {
      to: socketId,
      candidate: event.candidate,
    });
  };
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
  socket.emit("call-user", {
    offer,
    to: socketId,
  });
}
