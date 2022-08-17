import axios from 'axios'
import dayjs from 'dayjs'

export default defineEventHandler(async () => {
  const date = dayjs(new Date()).format('YYYYMMDD')
  const url = `http://tools.2345.com/frame/api/GetLunarInfo?date=${date}`
  const { data } = await axios.get(url)
  return data
})
