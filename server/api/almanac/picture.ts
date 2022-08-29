import almanac from '~~/utils/almanac'
import { DrawCard } from '~~/utils/draw'

export default defineEventHandler(async (ctx) => {
  const result = await almanac()

  ctx.res.setHeader('Content-Type', 'image/svg+xml')

  try {
    const drawCard = new DrawCard({})
    return drawCard.drawByFabric(result)
  }
  catch (e) {
    return e
  }
})
