import jsdom from 'jsdom'
import { omit } from 'lodash'
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
  radius?: number
}

export interface DrawCardPosition {
  x: number
  y: number
}

export interface DrawCardTagRect extends DrawCardPosition {
  width: number
  height: number
  content: string
  length: number
}

export type DrawCardHalfDistrict = [DrawCardTagRect[], DrawCardTagRect[]]

export class DrawCard {
  options: Required<DrawCardOptions>
  doc: Document
  svg: SVGElement | null = null
  defs: SVGElement | null = null

  constructor(options: DrawCardOptions) {
    // 合并配置
    const defaultOptions: DrawCardOptions = {
      width: 400,
      fontSize: 16,
      startX: 68,
      padding: 15,
      margin: 8,
      border: 1,
      fontPadding: 8,
      radius: 4,
    }
    this.options = this.merageOptions(defaultOptions, (options || {}))

    this.doc = new jsdom.JSDOM().window.document
  }

  merageOptions(defaultOptions: DrawCardOptions, options: DrawCardOptions): Required<DrawCardOptions> {
    const use = { ...defaultOptions, ...options } as Required<DrawCardOptions>
    use.startX = use.startX + use.margin
    use.startY = use.padding + use.margin
    return use
  }

  calcAllPosition(data: AlmanacResult): DrawCardHalfDistrict {
    const { width, startX, startY, fontSize, padding, fontPadding } = this.options
    const halfDistrict: DrawCardHalfDistrict = [[], []]

    let [countWith, countHeight] = [startX, startY]
    for (let i = 0; i < data.length; i++) {
      if (i === 1) {
        countWith = startX
        countHeight += padding * 6
      }
      data[i].list.forEach((item) => {
        const text = `${item.emoji} ${item.name}`
        const textLength = this.calcEmojiTextLength(text)

        const rectWidth = textLength + fontPadding * 2
        const rectHeight = fontSize + fontPadding * 1.5

        if (rectWidth > width - countWith - padding) {
          countWith = startX
          countHeight += rectHeight + padding
        }

        const rect: DrawCardTagRect = {
          x: countWith,
          y: countHeight,
          width: rectWidth,
          height: rectHeight,
          content: text,
          length: textLength,
        }
        halfDistrict[i].push(rect)

        countWith += rectWidth + padding
      })
    }
    return halfDistrict
  }

  draw(data: AlmanacResult) {
    const { width, margin, padding } = this.options
    const halfDistrict = this.calcAllPosition(data)
    const last = halfDistrict[1][halfDistrict[1].length - 1]
    const height = last.y + last.height + (padding / 2)

    const svgWidth = width + margin * 2
    const svgHeight = height + margin * 2
    this.svg = this.createSvgElement('svg', { width: svgWidth, height: svgHeight })
    this.createBorderRect({
      x: margin,
      y: margin,
      width,
      height,
    })

    for (let i = 0; i < halfDistrict.length; i++)
      halfDistrict[i].forEach(item => this.createTextRect(item))

    return this.svg?.outerHTML
  }

  /**
   * 创建SVG元素
   */
  createSvgElement<T extends keyof SVGElementTagNameMap>(element: T, attributes: Record<string, string | number> | string = '') {
    const ele = this.doc.createElementNS<T>('http://www.w3.org/2000/svg', element)
    if (element === 'svg') {
      ele.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      ele.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    }
    if (typeof attributes === 'string') {
      ele.setAttribute('style', attributes)
    }
    else {
      for (const key in attributes)
        ele.setAttribute(key, `${attributes[key]}`)
    }
    return ele
  }

  createBorderRect({ x, y, height, width }: Omit<DrawCardTagRect, 'length' | 'content'>, g: SVGGElement | null = null) {
    const { radius } = this.options
    const target = g || this.svg
    target?.appendChild(this.createSvgElement('rect', {
      'fill': '#fff',
      'stroke': '#e5e7eb',
      'rx': radius,
      'ry': radius,
      x,
      y,
      width,
      height,
      'stroke-width': 1,
    }))
  }

  /**
   * 包含文字的圆角矩形
   */
  createTextRect({ x, y, height, width, content, length }: DrawCardTagRect) {
    const { fontSize } = this.options
    const g = this.createSvgElement('g')
    this.createBorderRect({ x, y, height, width }, g)

    const text = this.createSvgElement('text', {
      'fill': '#000',
      'fontSize': fontSize,
      'x': x + (width / 2) - length / 2,
      'y': y + height - (fontSize / 2),
      'baseline-shift': 'baseline',
    })
    text.textContent = content
    g.appendChild(text)
    this.svg?.appendChild(g)
  }

  /**
   * 计算包含 emoji 的文本长度
   */
  calcEmojiTextLength(text: string) {
    const { fontSize } = this.options
    const [emoji, chinese] = text.split(' ')
    if (chinese)
      return (chinese.length * fontSize) + (fontSize * 0.625) + (emoji.length * (fontSize / 2))
    else
      return 0
  }

  // draw(data: AlmanacResult) {
  //   const { width, margin, startX, border, padding } = this.options

  //   const halfDistrict = this.calcAllPosition(data)
  //   const last = halfDistrict[1][halfDistrict[1].length - 1]
  //   const height = last.y + last.height + (padding / 2) + border

  //   const canvas = createCanvas(width + margin * 2, height + margin * 2)

  //   registerFont('/segoeui.ttf', { family: 'SegoeUI' })
  //   this.ctx = canvas.getContext('2d')!

  //   if (this.ctx)
  //     this.ctx.fillStyle = 'rgba(255, 255, 255, 0)'

  //   // 绘制背景边框
  //   this.drawRoundRect({ x: margin, y: margin }, width, height, 4)
  //   for (let i = 0; i < halfDistrict.length; i++) {
  //     if (i === 1)
  //       this.drawLine({ x: margin, y: halfDistrict[i][0].y - (padding * 0.8) }, { x: width + margin, y: halfDistrict[i][0].y - (padding * 0.8) })

  //     halfDistrict[i].forEach((item) => {
  //       this.drawTextRoundRect(item, item.content)
  //     })

  //     const districtLast = halfDistrict[i][halfDistrict[i].length - 1]
  //     const districtFirst = halfDistrict[i][0]
  //     this.drawText({
  //       x: startX / 2,
  //       y: districtFirst.y + (((districtLast.y + districtLast.height + padding + margin) - districtFirst.y) / 2),
  //     }, data[i].title)
  //   }
  //   this.drawLine({ x: startX, y: margin }, { x: startX, y: height + margin + border })

  //   return canvas.toBuffer('image/png', { compressionLevel: 3, filters: canvas.PNG_FILTER_NONE })
  // }

  // drawRoundRectPath(width: number, height: number, radius: number) {
  //   if (!this.ctx)
  //     return
  //   this.ctx.beginPath()
  //   this.ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2)
  //   this.ctx.lineTo(radius, height)
  //   this.ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)
  //   this.ctx.lineTo(0, radius)
  //   this.ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2)
  //   this.ctx.lineTo(width - radius, 0)
  //   this.ctx.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2)
  //   this.ctx.lineTo(width, height - radius)
  //   this.ctx.closePath()
  // }

  // drawRoundRect(position: DrawCardPosition, width: number, height: number, radius: number) {
  //   if (!this.ctx)
  //     return
  //   if (2 * radius > width || 2 * radius > height)
  //     return false
  //   this.ctx.save()
  //   this.ctx.translate(position.x, position.y)
  //   this.drawRoundRectPath(width, height, radius)

  //   this.ctx.lineWidth = 1
  //   this.ctx.strokeStyle = '#e5e7eb'
  //   this.ctx.stroke()
  //   this.ctx.shadowOffsetX = 2
  //   this.ctx.shadowOffsetY = 2
  //   this.ctx.shadowColor = 'rgba(0,0,0,0.1)'
  //   this.ctx.shadowBlur = 4
  //   this.ctx.fillStyle = '#ffffff'
  //   this.ctx.fill()

  //   this.ctx.restore()
  // }

  // drawTextRoundRect(tagRect: DrawCardTagRect, content: string) {
  //   if (!this.ctx)
  //     return
  //   const { fontSize, padding, font } = this.options
  //   const position = { x: tagRect.x, y: tagRect.y }
  //   this.drawRoundRect(position, tagRect.width + (padding / 2), tagRect.height, 4)
  //   // 填充文字
  //   this.ctx.font = `${fontSize}px ${font}`
  //   this.ctx.textAlign = 'center'
  //   this.ctx.textBaseline = 'middle'
  //   this.ctx.fillStyle = '#000000'
  //   this.ctx.fillText(content, position.x + tagRect.width / 2 + (padding / 4), position.y + tagRect.height / 2)
  // }

  // drawLine(start: DrawCardPosition, end: DrawCardPosition) {
  //   if (!this.ctx)
  //     return
  //   this.ctx.beginPath()
  //   this.ctx.moveTo(start.x, start.y)
  //   this.ctx.lineTo(end.x, end.y)
  //   this.ctx.strokeStyle = '#e5e7eb'
  //   this.ctx.lineWidth = 1
  //   this.ctx.stroke()
  //   this.ctx.closePath()
  // }

  // drawText(position: DrawCardPosition, content: string) {
  //   if (!this.ctx)
  //     return
  //   const { fontSize, font } = this.options
  //   const size = fontSize * 1.25
  //   this.ctx.beginPath()
  //   this.ctx.moveTo(position.x, position.y)
  //   this.ctx.font = `${size}px ${font}`
  //   this.ctx.textAlign = 'center'
  //   this.ctx.textBaseline = 'middle'
  //   this.ctx.fillStyle = '#000000'
  //   this.ctx.fillText(content, position.x + (size / 4), position.y - (size / 2))
  //   this.ctx.closePath()
  // }
}
