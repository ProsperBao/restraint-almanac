import type { AlmanacResult } from '~~/utils/almanac'
import almanac from '~~/utils/almanac'

export default defineEventHandler<AlmanacResult>(async (ctx) => {
  const query: Partial<{ time: string }> = getQuery(ctx)
  return await (almanac(new Date(query.time || 'undefined')))
})
