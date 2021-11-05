import express from "express";
import { createServer } from "http";
import { Server } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport"
import { monitor } from "@colyseus/monitor";

const app = express();
const server = createServer(app); // create the http server manually

const gameServer = new Server({
  transport: new WebSocketTransport({
      server // provide the custom server for `WebSocketTransport`
  })
});

// gameServer.define('room1', MyRoom, {})

app.use('/colyseus', monitor())
const port = Number(process.env.port) || 2567
gameServer.listen(port)
