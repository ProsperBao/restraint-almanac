import fs from 'fs'
import { resolve } from 'path'
import dayjs from 'dayjs'
import almanac from '../utils/almanac'
import type { AlmanacResult } from '../utils/almanac'
import cache from '../data/cache.json'

(async () => {
  const CACHE_JSON = cache as Record<string, AlmanacResult>

  const date = dayjs().format('YYYYMMDD')
  if (CACHE_JSON[date])
    return

  const res: AlmanacResult = await almanac(date)
  CACHE_JSON[date] = res

  const json = JSON.stringify(CACHE_JSON)

  const root = process.cwd()
  fs.writeFileSync(resolve(root, './data/cache.json'), json)
})()
