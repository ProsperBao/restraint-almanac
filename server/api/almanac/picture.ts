import fs from 'fs'
import axios from 'axios'
import almanac from '~~/utils/almanac'
import { DrawCard } from '~~/utils/draw'

export default defineEventHandler(async () => {
  const result = await almanac()

  // 判断文件是否存在
  if (!fs.existsSync('./segoeui.ttf')) {
    const res = await axios.get('https://almanac.baii.icu/fonts/segoeui.ttf', { responseType: 'arraybuffer' })
    fs.writeFileSync('./segoeui.ttf', res.data)
  }

  try {
    const drawCard = new DrawCard({})
    return drawCard.draw(result)
  }
  catch (e) {
    return e
  }
})
