<template>
  <nav text="xl gray4" m-5 flex justify-center gap-3>
    <NuxtLink i-carbon:floating-ip to="/" />
    <a i-carbon-logo-github href="https://github.com/ProsperBao/restraint-almanac" target="_blank" />
    <DarkToggle />
    <a i-carbon:status-change href="javascript:;" @click="() => toggleCard()" />
  </nav>
</template>
