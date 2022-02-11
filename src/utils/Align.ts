export class Align {
  static width: number
  static height: number

  static scaleTo(obj: any, per: number, width = Align.width) {
    obj.displayWidth = width * per
    obj.scaleY = obj.scaleX
  }
}
