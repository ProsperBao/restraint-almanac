import axios from 'axios'
import dayjs from 'dayjs'
import type { Keyword } from '~~/data/match'
import { match } from '~~/data/match'
import everyday from '~~/data/everyday.json'

export interface AlmanacItem {
  title: string
  list: Keyword[]
  str: string[]
}
export type AlmanacResult = AlmanacItem[]

export default defineEventHandler(async () => {
  const date = dayjs(new Date()).format('YYYYMMDD')
  const url = `http://tools.2345.com/frame/api/GetLunarInfo?date=${date}`
  const { data } = await axios.get(url)
  const yi = match(data.html.yi).sort((a, b) => b.name.length - a.name.length).reverse()
  const ji = match(data.html.ji).sort((a, b) => b.name.length - a.name.length).reverse()
  const e = everyday as string[]

  const result = yi.filter(item => !ji.some(jiItem => jiItem.name === item.name))

  return {
    yi: result.map(keyword => `${keyword.emoji} ${keyword.name}`).join('、'),
    ji: ji.map(keyword => `${keyword.emoji} ${keyword.name}`).join('、'),
    everyday: e[Math.floor(Math.random() * e.length)],
  }
})
