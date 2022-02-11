import express from 'express'
import http, { createServer } from 'http'
import { Server, Room, Client } from '@colyseus/core'
import { WebSocketTransport } from '@colyseus/ws-transport'
import { monitor } from '@colyseus/monitor'
import { Dispatcher } from "@colyseus/command";
import { OnJoinCommand } from "./OnJoinCommand";



const app = express()
const server = createServer(app)

const gameServer = new Server({
  transport: new WebSocketTransport({
    server,
  }),
})

class MyRoom extends Room {
  // When room is initialized
  dispatcher = new Dispatcher(this);
  onCreate(options: any) {
    console.log('onCreate...')
    // this.setState(new YourState());
  }

  // Authorize client based on provided options before WebSocket handshake is complete
  onAuth(client: Client, options: any, request: http.IncomingMessage) {
    return true
  }

  // When client successfully join the room
  onJoin(client: Client, options: any, auth: any) {
    console.log('onJoin...')
    this.dispatcher.dispatch(new OnJoinCommand(), {
      sessionId: client.sessionId
  });
  }

  // When a client leaves the room
  onLeave(client: Client, consented: boolean) {
    console.log('onLeave...')
  }

  // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
  onDispose() {
    console.log('onDispose...')
    this.dispatcher.stop();
  }
}

gameServer.listen(2567)
gameServer.define('room_name', MyRoom)
app.use('/colyseus', monitor())
