import type { DrawCardOptions } from '~~/utils/draw'
import almanac from '~~/utils/almanac'
import { DrawCard } from '~~/utils/draw'
import en from '~~/data/locales/en.json'
import jp from '~~/data/locales/jp.json'

const LANGUAGE_PRESET = {
  en: {
    lang: en,
    params: {
      fontSize: 16,
      margin: 8,
      // The left text of each language is different in terms of text width, so a starting position needs to be set based on the text.
      startX: 106,
    },
  },
  jp: {
    lang: jp,
    params: {
      fontSize: 16,
      margin: 8,
      startX: 102,
    },
  },
}

export default defineEventHandler(async (ctx) => {
  const query: Partial<DrawCardOptions & { time: string; lang?: 'jp' | 'en' }> = getQuery(ctx)

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
  ctx.res.setHeader('Content-Type', 'image/svg+xml')

  const drawCard = new DrawCard({
    width: +(query?.width || 0),
    ...(query.lang ? LANGUAGE_PRESET[query.lang]?.params : {}),
  })

  return drawCard.draw(result)
})
