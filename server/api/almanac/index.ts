import axios from 'axios'
import dayjs from 'dayjs'
import { match } from '~~/data/match'

export default defineEventHandler(async () => {
  const date = dayjs(new Date()).format('YYYYMMDD')
  const url = `http://tools.2345.com/frame/api/GetLunarInfo?date=${date}`
  const { data } = await axios.get(url)
  return {
    yi: match(data.html.yi),
    yiStr: data.html.yi,
    ji: match(data.html.ji),
    jiStr: data.html.ji,
  }
})
