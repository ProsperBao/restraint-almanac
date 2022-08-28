import almanac from '~~/utils/almanac'
import { DrawCard } from '~~/utils/draw'

const drawCard = new DrawCard({})

export default defineEventHandler(async () => {
  const result = await almanac()

  try {
    return drawCard.drawByFabric(result)
  }
  catch (e) {
    return e
  }
})
