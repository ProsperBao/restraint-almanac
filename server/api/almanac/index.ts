import { LANGUAGE_PRESET } from './picture'
import type { AlmanacResult } from '~~/utils/almanac'
import almanac from '~~/utils/almanac'

export default defineEventHandler<AlmanacResult>(async (ctx) => {
  const query: Partial<{ time: string; lang?: 'jp' | 'en' }> = getQuery(ctx)
  let result = await almanac(query.time)
  if (query.lang) {
    const lang: Record<string, string> = LANGUAGE_PRESET[query.lang].lang
    if (lang) {
      result = result.map(i => ({
        title: lang[i.title] || i.title,
        list: i.list.map(j => ({
          ...j,
          name: lang[j.name] || j.name,
        })),
        str: i.str.split(' ').map(j => lang[j] || j).join(' '),
      }))
    }
  }
  return result
})
