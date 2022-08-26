// import almanac from '~~/utils/almanac'
// import { DrawCard } from '~~/utils/draw'
import fs from 'fs'

export default defineEventHandler(async () => {
  // const result = await almanac()
  // try {
  //   const drawCard = new DrawCard({})
  //   return drawCard.draw(result)
  // }
  // catch (e) {
  //   return e
  // }
  // 输出当前目录下所有文件
  const files = fs.readdirSync('./')
  return files
})
