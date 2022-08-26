// import almanac from '~~/utils/almanac'
// import { DrawCard } from '~~/utils/draw'
import fs from 'fs'
import path from 'path'

function readfilelist(dir: any, fileslist: string[] = []) {
  const files = fs.readdirSync(dir)
  files.forEach((item) => {
    const fullpath = path.join(dir, item)
    const stat = fs.statSync(fullpath)
    if (stat.isDirectory())
      readfilelist(path.join(dir, item), fileslist) // 递归读取文件

    else
      fileslist.push(fullpath)
  })
  return fileslist
}

export default defineEventHandler(async () => {
  // const result = await almanac()
  // try {
  //   const drawCard = new DrawCard({})
  //   return drawCard.draw(result)
  // }
  // catch (e) {
  //   return e
  // }
  const fileslist: string[] = []
  readfilelist('./', fileslist)
  return fileslist
})
