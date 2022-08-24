import type { Keyword } from '~~/data/match'
import type { AlmanacResult } from '~~/server/api/almanac'

export interface Bound {
  l: number // 相对坐标
  t: number // 相对坐标
  x: number
  y: number
  w: number
  h: number
}

export class EmojiTag {
  bound?: Bound
  keyword: Keyword
  constructor(keyword: Keyword) {
    this.keyword = keyword
  }
}

export interface DrawOptions {
  with: number
}

function drawRoundRectPath(ctx: CanvasRenderingContext2D, width: number, height: number, radius: number) {
  ctx.beginPath()
  ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2)
  ctx.lineTo(radius, height)
  ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)
  ctx.lineTo(0, radius)
  ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2)
  ctx.lineTo(width - radius, 0)
  ctx.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2)
  ctx.lineTo(width, height - radius)
  ctx.closePath()
}

function strokeRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  if (2 * radius > width || 2 * radius > height)
    return false
  ctx.save()
  ctx.translate(x, y)
  drawRoundRectPath(ctx, width, height, radius)

  ctx.lineWidth = 1
  ctx.strokeStyle = '#e5e7eb'
  ctx.stroke()
  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2
  ctx.shadowColor = 'rgba(0,0,0,0.1)'
  ctx.shadowBlur = 4
  ctx.fillStyle = '#ffffff'
  ctx.fill()

  ctx.restore()
}

export function draw(canvas: HTMLCanvasElement, almanac: AlmanacResult, optios?: DrawOptions) {
  const defaultOptions = {
    width: 400,
    height: 359,
    padding: 10,
  }
  const {
    width,
    height,
    padding,
  } = { ...defaultOptions, ...optios }
  canvas.width = width + (padding * 2)
  canvas.height = height + (padding * 2)
  const ctx = canvas.getContext('2d')!
  strokeRoundRect(ctx, padding, padding, width, height, 4)
}
