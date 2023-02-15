import axios from 'axios'
import dayjs from 'dayjs'
import type { Keyword } from '~~/data/match'
import { match } from '~~/data/match'

export interface AlmanacItem {
  title: string
  list: Keyword[]
  str: string[]
}
export type AlmanacResult = AlmanacItem[]

export default async (time = new Date()) => {
  const date = dayjs(time).format('YYYYMMDD')
  const url = `http://tools.2345.com/frame/api/GetLunarInfo?date=${date}`
  const { data } = await axios.get(url)
  const yi = match(data.html.yi).sort((a, b) => b.name.length - a.name.length).reverse()
  const ji = match(data.html.ji).sort((a, b) => b.name.length - a.name.length).reverse()

  const result = yi.filter(item => !ji.some(jiItem => jiItem.name === item.name))

  return [
    {
      title: '宜',
      list: result,
      str: data.html.yi,
    },
    {
      title: '忌',
      list: ji,
      str: data.html.ji,
    },
  ]
}
