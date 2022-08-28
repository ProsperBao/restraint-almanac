import almanac from '~~/utils/almanac'
import { DrawCard } from '~~/utils/draw'

export default defineEventHandler(async () => {
  const result = await almanac()

  try {
    // const drawCard = new DrawCard({})
    // return drawCard.drawByFabric(result)
    return result
  }
  catch (e) {
    return e
  }
})
