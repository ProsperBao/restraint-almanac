import almanac from '~~/utils/almanac'
// import { DrawCard } from '~~/utils/draw'

export default defineEventHandler(async () => {
  const result = await almanac()

  try {
    return result
  }
  catch (e) {
    return e
  }
})
