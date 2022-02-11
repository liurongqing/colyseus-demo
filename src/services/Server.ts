import { Client, Room } from 'colyseus.js'
import { GameState, Message } from './ITicTacToeState'

export class Server {
  private client: Client
  private events: Phaser.Events.EventEmitter

  private room?: Room
  private _playerIndex = -1

  get playerIndex() {
    return this._playerIndex
  }

  get gameState() {
    if (!this.room) {
      return GameState.WaitingForPlayers
    }
    return this.room?.state.gameState
  }

  constructor() {
    this.client = new Client('ws://localhost:2567')
    this.events = new Phaser.Events.EventEmitter()
  }

  async join() {
    this.room = await this.client.joinOrCreate('tic-tac-toe')

    this.room.onMessage(Message.PlayerIndex, (message) => {
      this._playerIndex = message.playerIndex
    })

    this.room.onStateChange.once((state) => {
      this.events.emit('once-state-changed', state)
    })

    this.room.state.onChange = (changes) => {
      console.log('onChange...')
      changes.forEach((change) => {
        const { field, value } = change
        switch (field) {
          case 'activePlayer':
            this.events.emit('player-turn-changed', value)
            break

          case 'winningPlayer':
            this.events.emit('player-win', value)
            break

          case 'gameState':
            this.events.emit('game-state-changed', value)
            break
        }
      })
    }

    this.room.state.board.onChange = (item, idx) => {
      this.events.emit('board-changed', item, idx)
    }
  }

  leave() {
    this.room?.leave()
    this.events.removeAllListeners()
  }

  makeSelection(idx: number) {
    if (!this.room) {
      return
    }

    if (this.room.state.gameState !== GameState.Playing) {
      return
    }

    if (this.playerIndex !== this.room.state.activePlayer) {
      console.warn("not this player's turn")
      return
    }

    this.room.send(Message.PlayerSelection, { index: idx })
  }

  onceStateChanged(cb, context?: any) {
    this.events.once('once-state-changed', cb, context)
  }

  onBoardChanged(cb: (cell: number, index: number) => void, context?: any) {
    this.events.on('board-changed', cb, context)
  }

  onPlayerTurnChanged(cb: (playerIndex: number) => void, context?: any) {
    this.events.on('player-turn-changed', cb, context)
  }

  onPlayerWon(cb: (playerIndex: number) => void, context?: any) {
    this.events.on('player-win', cb, context)
  }

  onGameStateChanged(cb: (state: GameState) => void, context?: any) {
    this.events.on('game-state-changed', cb, context)
  }
}
