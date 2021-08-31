<script setup lang="ts">
  const { $content } = useContext();
  const gizlilikPolitikasi = useAsync(() =>
    $content("gizlilik-politikasi").fetch()
  );
</script>

<template>
  <main class="disclaimer-layout">
    <nuxt-content class="prose-lg" :document="gizlilikPolitikasi" />
    <nuxt-link class="accept-button" to="/">Kabul Ediyorum</nuxt-link>
  </main>
</template>
