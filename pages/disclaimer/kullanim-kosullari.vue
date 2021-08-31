<script setup lang="ts">
  const { $content } = useContext();
  const kullanimKosullari = useAsync(() =>
    $content("kullanim-kosullari").fetch()
  );
</script>

<template>
  <main class="disclaimer-layout">
    <nuxt-content class="prose-lg" :document="kullanimKosullari" />
    <nuxt-link class="accept-button" to="/">Kabul Ediyorum</nuxt-link>
  </main>
</template>

<!-- <style lang="postcss" scoped></style> -->
