class NetworkClient {

  private readonly socket: WebSocket;

  constructor() {
    this.socket = new WebSocket("ws://localhost:8080");
    this.socket.onopen = function(event) {
      console.log("Connected!");
    }
  }

  send(data: string){
    this.socket.send(data);
  }
}


export const networkClient = new NetworkClient();