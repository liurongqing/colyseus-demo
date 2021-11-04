import { Client } from 'colyseus.js'

const client = new Client('ws://localhost:2567')

class Game {
  room = null
  constructor() {
    this.join()
  }

  // 加入房间
  async join() {
    try {
      this.room = await client.joinOrCreate('room1')
      console.log('room', this.room)
    } catch (e) {
      console.log('e', e)
    }
  }

  // 房间状态更新
  handleChange() {
    this.room.onStateChange((state) => {
      console.log('onStateChange state%o', state)
    })
  }

  // 服务器广播或是直接发到本客户端的信息
  handleMessage() {
    this.room.onMessage('message_type', (message) => {
      console.log('onMessage:', message)
    })
  }

  // 服务器端发生错误
  handleError() {
    this.room.onError((code, message) => {
      console.log('onError', code, message)
    })
  }

  // 离开房间
  handleLeave() {
    this.room.onLeave((code) => {
      console.log('onLeave', code)
    })
  }
}

new Game()
