import axios from 'axios'
import dayjs from 'dayjs'
import { load } from 'cheerio'
import type { Keyword } from '~~/data/match'
import { match } from '~~/data/match'

export interface AlmanacItem {
  title: string
  list: Keyword[]
  str: string
}
export type AlmanacResult = AlmanacItem[]

const TIME_CATCH: Map<string, AlmanacResult> = new Map()

export default async (time?: string) => {
  const date = dayjs(time).format('YYYYMMDD')

  if (TIME_CATCH.has(date))
    return TIME_CATCH.get(date)!

  const url = `http://m.wannianli3.com/${date}huangdaojiri`
  const { data } = await axios.get(url)
  const $ = load(data)

  const yiStr = $('div.main > div:nth-child(3) > div > table > tbody > tr:nth-child(3) > td')
    .text()
    .replace(/\s+/g, ' ')

  const jiStr = $('div.main > div:nth-child(3) > div > table > tbody > tr:nth-child(4) > td')
    .text()
    .replace(/\s+/g, ' ')

  const yi = match(yiStr).sort((a, b) => b.name.length - a.name.length).reverse()
  const ji = match(jiStr).sort((a, b) => b.name.length - a.name.length).reverse()

  const result: AlmanacResult = [
    {
      title: '宜',
      list: yi.filter(item => !ji.some(jiItem => jiItem.name === item.name)),
      str: yiStr,
    },
    {
      title: '忌',
      list: ji,
      str: jiStr,
    },
  ]

  TIME_CATCH.set(date, result)

  return result
}
