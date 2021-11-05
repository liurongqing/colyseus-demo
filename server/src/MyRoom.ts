import { Room, Client } from 'colyseus'
// import { IncomingMessage } from 'http'

export class MyRoom extends Room {
  onCreate(options) {
    // console.log('onCreate... options:%o', options)
  }
  // onAuth(client: Client, options: any, request: IncomingMessage) {
  //   // console.log(
  //   //   'onauth client:%o, options:%o, request:%o',
  //   //   client,
  //   //   options,
  //   //   request
  //   // )
  //   return {
  //     name: 'liurongqing',
  //     age: 30,
  //   }
  // }
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
