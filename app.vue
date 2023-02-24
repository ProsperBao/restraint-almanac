<script setup>
useHead({ title: '食材黄历 - 自律人的日历' })
</script>

<template>
  <NuxtLayout cl>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
