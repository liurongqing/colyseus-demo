export class Bootstrap extends Phaser.Scene {
  constructor() {
    super('bootstrap')
  }

  init() {}

  create() {
    this.scene.start('game')
  }
}
