import 'phaser'

import { Align } from '@/utils'
import * as scenes from '@/scenes'

const scene = Object.values(scenes)
const { innerWidth: width, innerHeight: height } = window
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width,
  height,
  scene,
}

/**
 * 初始化
 */
Align.width = width
Align.height = height
new Phaser.Game(config)
