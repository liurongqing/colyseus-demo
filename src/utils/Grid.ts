export class Grid {
  width: number
  height: number
  cw: number
  ch: number
  rows: number
  cols: number
  origin: number[]
  scene: any
  debug: boolean

  constructor({
    scene = null as any,
    rows = 5,
    cols = 5,
    origin = [0.5, 0.5],
    debug = false,
  }) {
    if (!scene) console.log('missing scene')
    const { width, height } = scene.scale

    this.scene = scene
    this.rows = rows
    this.cols = cols
    this.origin = origin
    this.debug = debug
    this.width = width
    this.height = height
    this.cw = width / cols
    this.ch = height / rows

    if (debug) {
      this.draw()
    }
  }

  at(obj: any, row: number, col: number) {
    const x = this.cw * col + this.cw * this.origin[0]
    const y = this.ch * row + this.ch * this.origin[1]
    obj.setPosition(x, y)
  }

  atIndex(obj: any, index: number) {
    const row = Math.floor(index / this.cols)
    const col = index - row * this.cols
    this.at(obj, row, col)
  }

  draw() {
    this.drawLine()
    this.drawText()
  }

  drawLine() {
    const graphics = this.scene.add.graphics()
    graphics.lineStyle(1, 0xff0000)

    for (let i = 0; i < this.width; i += this.cw) {
      graphics.moveTo(i, 0)
      graphics.lineTo(i, this.height)
    }

    for (let j = 0; j < this.height; j += this.ch) {
      graphics.moveTo(0, j)
      graphics.lineTo(this.width, j)
    }

    graphics.strokePath()
  }

  drawText() {
    let count = 0
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const text = this.scene.add.text(0, 0, count, { color: '#ff0000' })
        // text.setOrigin(0.5, 0.5);
        this.atIndex(text, count)
        count++
      }
    }
  }
}
