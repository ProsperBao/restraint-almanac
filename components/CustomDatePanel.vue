<script lang="ts" setup>
import dayjs from 'dayjs'
import { vOnClickOutside } from '@vueuse/components'

const props = defineProps<{ modelValue: Date; mode: 'DAY' | 'MONTH' | 'YEAR' }>()
const emits = defineEmits(['update:modelValue'])
const date = useVModel(props, 'modelValue', emits)

const formatterMap = {
  YEAR: 'YYYY',
  MONTH: 'MM',
  DAY: 'DD',
}

const formatter = computed(() => dayjs(date.value).format(formatterMap[props.mode]))

let currentDatePage = $ref(0)
const currentLineLimit = { YEAR: 3, MONTH: 4, DAY: 7 }
const currentDateList = computed(() => {
  const time = dayjs(date.value)
  const mode = props.mode
  if (mode === 'DAY')
    return Array.from({ length: time.add(currentDatePage, 'month').daysInMonth() }, (_, i) => i + 1)

  if (mode === 'MONTH')
    return Array.from({ length: 12 }, (_, i) => i + 1)

  if (mode === 'YEAR') {
    if (currentDatePage === 0) {
      // 取当前年份的前5年和后5年
      const startYear = time.year() - 5
      const endYear = time.year() + 5
      return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
    }
    else {
      const baseYear = currentDatePage > 0 ? 4 : -4
      // 按数量+-10年，取出对应的每一年形成列表
      const startYear = time.add(currentDatePage * 9 + baseYear, 'year').year()
      const endYear = time.add((currentDatePage + 1) * 9 + baseYear, 'year').year() - 1
      return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
    }
  }
})

const [visible, toggleVisible] = useToggle(false)
function closeVisible() {
  toggleVisible(false)
  currentDatePage = 0
}

function handleChooseTime(time: number) {
  // 根据currentDatePage和time，计算出对应的日期并且更新date
  const mode = props.mode
  const timeObj = dayjs(date.value)
  if (mode === 'DAY')
    date.value = timeObj.add(currentDatePage, 'month').set('date', time).toDate()

  else if (mode === 'MONTH')
    date.value = timeObj.set('month', time - 1).toDate()

  else if (mode === 'YEAR')
    date.value = timeObj.add(currentDatePage * 9, 'year').set('year', time).toDate()
}
</script>

<template>
  <div relative>
    <div p-2 border border-transparent cursor-pointer class="hover:custom-card" @click="toggleVisible(true)">
      {{ formatter }}
    </div>
    <section v-if="visible" v-on-click-outside="closeVisible" absolute top-0 z-2 left="50%" transform translate-x="-50%" class="custom-card">
      <nav flex justify-between items-center gap-x-10>
        <button v-if="mode === 'YEAR'" @click="currentDatePage--">
          prev
        </button>
        <div w-25 text-center m-auto>
          {{ dayjs(date).format('YYYY-MM-DD') }}
        </div>
        <button v-if="mode === 'YEAR'" @click="currentDatePage++">
          next
        </button>
      </nav>
      <ul grid text-center gap-2 mt-2 :style="`grid-template-columns: repeat(${currentLineLimit[mode]}, 1fr);`">
        <li v-for="num in currentDateList" :key="num" cursor-pointer class="hover:underline" @click="handleChooseTime(num)">
          {{ num }}
        </li>
      </ul>
    </section>
  </div>
</template>
