import { createCanvas, registerFont } from 'canvas'
import type { AlmanacResult } from './almanac'

export interface DrawCardOptions {
  width?: number
  padding?: number
  fontSize?: number
  fontPadding?: number
  startX?: number
  startY?: number
  margin?: number
  border?: number
  font?: string
}

export interface DrawCardPosition {
  x: number
  y: number
}

export interface DrawCardTagRect extends DrawCardPosition {
  width: number
  height: number
  content: string
}

export type DrawCardHalfDistrict = [DrawCardTagRect[], DrawCardTagRect[]]

export class DrawCard {
  options: Required<DrawCardOptions>
  ctx: CanvasRenderingContext2D | null = null

  constructor(options: DrawCardOptions) {
    // 合并配置
    const defaultOptions: DrawCardOptions = {
      width: 400,
      fontSize: 15,
      fontPadding: 2,
      startX: 58,
      padding: 15,
      margin: 8,
      border: 1,
      font: 'SegoeUI',
    }
    this.options = this.merageOptions(defaultOptions, (options || {}))
  }

  merageOptions(defaultOptions: DrawCardOptions, options: DrawCardOptions): Required<DrawCardOptions> {
    const use = { ...defaultOptions, ...options } as Required<DrawCardOptions>
    use.startX = use.startX + use.margin
    use.startY = use.padding + use.margin
    return use
  }

  calcAllPosition(data: AlmanacResult): DrawCardHalfDistrict {
    const { width, startX, startY, fontSize, padding, border, fontPadding } = this.options
    const halfDistrict: DrawCardHalfDistrict = [[], []]

    let [countWith, countHeight] = [startX + padding, startY]
    for (let i = 0; i < data.length; i++) {
      if (i === 1) {
        countWith = startX + padding
        countHeight += padding * 3.5
      }
      data[i].list.forEach((item) => {
        // 计算当前矩形的位置
        const rectWidth = `${item.emoji}${item.name}`.length * fontSize + (padding / 2)
        const rectHeight = fontSize + (padding / 2) + fontPadding

        // 宽度是否超出剩下宽度
        // 矩形宽度 > canvas宽度 - 累计宽度 - 右边空白 - 右边边框
        if (rectWidth > width - countWith - padding - border) {
          countWith = startX + padding
          countHeight += rectHeight + (padding / 2)
        }

        // 保存矩形的位置
        const rect: DrawCardTagRect = {
          x: countWith,
          y: countHeight,
          width: rectWidth,
          height: rectHeight,
          content: `${item.emoji} ${item.name}`,
        }
        halfDistrict[i].push(rect)

        countWith += rectWidth + padding
      })
    }
    return halfDistrict
  }

  draw(data: AlmanacResult) {
    const { width, margin, startX, border, padding } = this.options

    const halfDistrict = this.calcAllPosition(data)
    const last = halfDistrict[1][halfDistrict[1].length - 1]
    const height = last.y + last.height + (padding / 2) + border

    const canvas = createCanvas(width + margin * 2, height + margin * 2)

    registerFont('/assets/fonts/segoeui.ttf', { family: 'SegoeUI' })
    this.ctx = canvas.getContext('2d')!

    if (this.ctx)
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0)'

    // 绘制背景边框
    this.drawRoundRect({ x: margin, y: margin }, width, height, 4)
    for (let i = 0; i < halfDistrict.length; i++) {
      if (i === 1)
        this.drawLine({ x: margin, y: halfDistrict[i][0].y - (padding * 0.8) }, { x: width + margin, y: halfDistrict[i][0].y - (padding * 0.8) })

      halfDistrict[i].forEach((item) => {
        this.drawTextRoundRect(item, item.content)
      })

      const districtLast = halfDistrict[i][halfDistrict[i].length - 1]
      const districtFirst = halfDistrict[i][0]
      this.drawText({
        x: startX / 2,
        y: districtFirst.y + (((districtLast.y + districtLast.height + padding + margin) - districtFirst.y) / 2),
      }, data[i].title)
    }
    this.drawLine({ x: startX, y: margin }, { x: startX, y: height + margin + border })

    return canvas.toBuffer('image/png')
  }

  drawRoundRectPath(width: number, height: number, radius: number) {
    if (!this.ctx)
      return
    this.ctx.beginPath()
    this.ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2)
    this.ctx.lineTo(radius, height)
    this.ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)
    this.ctx.lineTo(0, radius)
    this.ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2)
    this.ctx.lineTo(width - radius, 0)
    this.ctx.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2)
    this.ctx.lineTo(width, height - radius)
    this.ctx.closePath()
  }

  drawRoundRect(position: DrawCardPosition, width: number, height: number, radius: number) {
    if (!this.ctx)
      return
    if (2 * radius > width || 2 * radius > height)
      return false
    this.ctx.save()
    this.ctx.translate(position.x, position.y)
    this.drawRoundRectPath(width, height, radius)

    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = '#e5e7eb'
    this.ctx.stroke()
    this.ctx.shadowOffsetX = 2
    this.ctx.shadowOffsetY = 2
    this.ctx.shadowColor = 'rgba(0,0,0,0.1)'
    this.ctx.shadowBlur = 4
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fill()

    this.ctx.restore()
  }

  drawTextRoundRect(tagRect: DrawCardTagRect, content: string) {
    if (!this.ctx)
      return
    const { fontSize, padding, font } = this.options
    const position = { x: tagRect.x, y: tagRect.y }
    this.drawRoundRect(position, tagRect.width + (padding / 2), tagRect.height, 4)
    // 填充文字
    this.ctx.font = `${fontSize}px ${font}`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillStyle = '#000000'
    this.ctx.fillText(content, position.x + tagRect.width / 2 + (padding / 4), position.y + tagRect.height / 2)
  }

  drawLine(start: DrawCardPosition, end: DrawCardPosition) {
    if (!this.ctx)
      return
    this.ctx.beginPath()
    this.ctx.moveTo(start.x, start.y)
    this.ctx.lineTo(end.x, end.y)
    this.ctx.strokeStyle = '#e5e7eb'
    this.ctx.lineWidth = 1
    this.ctx.stroke()
    this.ctx.closePath()
  }

  drawText(position: DrawCardPosition, content: string) {
    if (!this.ctx)
      return
    const { fontSize, font } = this.options
    const size = fontSize * 1.25
    this.ctx.beginPath()
    this.ctx.moveTo(position.x, position.y)
    this.ctx.font = `${size}px ${font}`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillStyle = '#000000'
    this.ctx.fillText(content, position.x + (size / 4), position.y - (size / 2))
    this.ctx.closePath()
  }
}
