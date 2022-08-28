// import almanac from '~~/utils/almanac'
// import { DrawCard } from '~~/utils/draw'
import { fabric } from 'fabric'

export default defineEventHandler(async () => {
  // const result = await almanac()

  try {
    const canvas = new fabric.Canvas('canvas')
    const rect = new fabric.Rect({
      width: 50,
      height: 50,
      left: 100,
      top: 100,
      stroke: '#aaf',
      strokeWidth: 1,
      fill: '#faa',
      selectable: false,
    })
    canvas.add(rect)
    const rect1 = new fabric.Rect({
      width: 50,
      height: 50,
      left: 50,
      top: 50,
      stroke: '#faa',
      strokeWidth: 1,
      fill: '#aaf',
      selectable: false,
    })
    canvas.add(rect)
    canvas.add(rect1)
    return canvas.toSVG()
  }
  catch (e) {
    return e
  }
})
