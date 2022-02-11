import { Client, Room } from 'colyseus.js'
// import type { Client } from 'colyseus.js'
export class Game extends Phaser.Scene {
  client: Client
  room?: Room
  constructor() {
    super('game')
    this.client = new Client('ws://localhost:2567')
  }

  init() {}

  async create() {
    this.join()
  }

  async join() {
    // 加入或创建房间
    try {
      this.room = await this.client.joinOrCreate('room_name')
      console.log('加入房间信息', this.room)
    } catch (e) {
      // 埋点生成数据
      console.log('加入房间失败', e)
      return true
    }

    this.listens()
  }

  async listens() {
    // 房间已更新
    this.room?.onStateChange((state) => {
      console.log(this.room?.name, 'new state', state)
    })

    // 来自服务器或是直接发送到此客户端的信息
    // room.send 可以发送信息
    this.room?.onMessage('0', (message) => {
      console.log('服务器或客户端发的信息', message)
    })

    // 服务器错误
    this.room?.onError((code, message) => {
      console.log(this.client, 'onError code message', code, message)
    })

    // 客户离开了房间
    this.room?.onLeave((code) => {
      // 1000 服务器中断
      console.log('onLeave code', code)
    })
  }
}
