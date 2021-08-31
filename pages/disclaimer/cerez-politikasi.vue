<script setup lang="ts">
  const { $content } = useContext();
  const cerezPolitikasi = useAsync(() => $content("cerez-politikasi").fetch());
</script>

<template>
  <main class="disclaimer-layout">
    <nuxt-content class="prose-lg mb-6" :document="cerezPolitikasi" />
    <nuxt-link class="accept-button" to="/">Kabul Ediyorum</nuxt-link>
  </main>
</template>
