import almanac from '~~/utils/almanac'
import type { DrawCardOptions } from '~~/utils/draw'
import { DrawCard } from '~~/utils/draw'

export default defineEventHandler(async (ctx) => {
  const query: Partial<DrawCardOptions & { time: string }> = getQuery(ctx)

  const result = await almanac(query.time ? new Date(query.time) : undefined)
  ctx.res.setHeader('Content-Type', 'image/svg+xml')

  try {
    const drawCard = new DrawCard({ width: +(query?.width || 0) })
    return drawCard.draw(result)
  }
  catch (e) {
    return e
  }
})
