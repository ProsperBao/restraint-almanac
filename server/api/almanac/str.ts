import everyday from '~~/data/everyday.json'
import almanac from '~~/utils/almanac'

export default defineEventHandler(async () => {
  const result = await almanac()

  const e = everyday as string[]

  return {
    yi: result[0].list.map(keyword => `${keyword.emoji} ${keyword.name}`).join('、'),
    ji: result[1].list.map(keyword => `${keyword.emoji} ${keyword.name}`).join('、'),
    everyday: e[Math.floor(Math.random() * e.length)],
  }
})
