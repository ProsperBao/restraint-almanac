import dayjs from 'dayjs'
import { calculateFields } from './lunar'
import type { Keyword } from '~~/data/match'
import { match } from '~~/data/match'
import lunar from '~~/data/lunar.json'

export interface AlmanacItem {
  title: string
  list: Keyword[]
  str: string
}
export type AlmanacResult = AlmanacItem[]

export default async (time?: string) => {
  const fields = calculateFields(dayjs(time))

  const data = (lunar as Record<string, { y: string; j: string }>)[fields]

  const yiStr = data.y
  const jiStr = data.j

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

  return result
}
