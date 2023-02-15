<script lang="ts" setup>
import dayjs from 'dayjs'

const props = defineProps<{ modelValue: Date }>()
const emits = defineEmits(['update:modelValue'])
const date = useVModel(props, 'modelValue', emits)

const formatter = computed(() => dayjs(date.value).format('YYYY-MM-DD'))

const prevDay = () => {
  date.value = dayjs(date.value).subtract(1, 'day').toDate()
}

const nextDay = () => {
  date.value = dayjs(date.value).add(1, 'day').toDate()
}
</script>

<template>
  <section m-auto text-left w-100 mb-5>
    <article flex justify-between items-center>
      <button border border-rounded shadow p-2 @click="prevDay">
        上一天
      </button>
      <span>{{ formatter }}</span>
      <button border border-rounded shadow p-2 @click="nextDay">
        下一天
      </button>
    </article>
  </section>
</template>
