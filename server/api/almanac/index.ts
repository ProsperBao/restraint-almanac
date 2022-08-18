import axios from 'axios'
import dayjs from 'dayjs'
import { match } from '~~/data/match'

export default defineEventHandler(async () => {
  const date = dayjs(new Date()).format('YYYYMMDD')
  const url = `http://tools.2345.com/frame/api/GetLunarInfo?date=${date}`
  const { data } = await axios.get(url)
  const yi = match(data.html.yi).sort((a, b) => b.name.length - a.name.length).reverse()
  const ji = match(data.html.ji).sort((a, b) => b.name.length - a.name.length).reverse()
  // 从 yi 中剔除包含 ji 的数据以每项得name作为key
  const result = yi.filter(item => !ji.some(jiItem => jiItem.name === item.name))

  return {
    yi: result,
    yiStr: data.html.yi,
    ji,
    jiStr: data.html.ji,
  }
})
