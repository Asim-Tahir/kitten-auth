<script lang="ts">
  import { defineComponent } from "@nuxtjs/composition-api";
  import { useCookies } from "@vueuse/integrations";

  export default defineComponent({
    setup() {
      // const { $content } = useContext();
      const username = ref<string>("");
      const password = ref<string>("");
      const accessTokenCookie = useCookies(["access_token"]);

      function register(username: string, password: string): void {
        // TODO: add user
        // const user = useAsync(
        //   () => $content().search({ username, password }).fetch(),
        //   "login-key"
        // );

        // if (user.value !== null) {
        accessTokenCookie.set(
          "access_token",
          Buffer.from(`${username}:${password}`, "base64").toString("utf8")
        );
        // }
      }

      return { username, password, register };
    },
  });
</script>

<template>
  <form>
    <label for="term" class="select-none">
      <input
        id="kullanim-sartlari"
        type="checkbox"
        required
        name="terms_of_use"
      />
      <nuxt-link to="/kullanim-sartlari">Kullanım Şartlarını</nuxt-link>
      okudum ve kabul ediyorum.
    </label>
  </form>
</template>

<!-- <style lang="postcss" scoped></style> -->
