import { createServer, IncomingMessage } from 'http'
import express from 'express'
import { Server } from '@colyseus/core'
import { WebSocketTransport } from '@colyseus/ws-transport'
import { Room, Client } from 'colyseus'

const app = express()
const server = createServer(app)
const port = Number(process.env.port) || 2567

const gameServer = new Server({
  transport: new WebSocketTransport({
    server,
  }),
})

gameServer.listen(port)

class MyRoom extends Room {
  onCreate(options) {
    // console.log('onCreate... options:%o', options)
  }
  onAuth(client: Client, options: any, request: IncomingMessage) {
    // console.log(
    //   'onauth client:%o, options:%o, request:%o',
    //   client,
    //   options,
    //   request
    // )
    return {
      name: 'liurongqing',
      age: 30
    }
  }
  onJoin(client: Client, options: any, auth: any) {
    // console.log('onJoin client:%o, options:%o, auth:%o', client, options, auth)

  }
  onLeave(client: Client, consented: boolean) {
    // console.log('onLeave client:%o, consented:%o', client, consented)
  }
  onDispose(...rest) {
    // console.log('onDispose ...rest%o', rest)
  }
}

gameServer.define('room1', MyRoom, {})
