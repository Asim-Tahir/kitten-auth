<script setup lang="ts">
  import { useAuthenticationStore } from "@/store";
  import { getUserFromCookie } from "@/helpers";
  import { IUser } from "@/types";

  const router = useRouter();
  const store = useAuthenticationStore();

  // Cookkie is specified redirect to home
  let userFromCookie = getUserFromCookie("access_token");
  // if (userFromCookie) {
  //   router.push({ path: "/" });
  // }

  // Input v-model value variables
  const userInput = reactive<IUser>({ username: "demo", password: "demo" });

  function login(user: IUser): void {
    store.login(user);
    userFromCookie = getUserFromCookie("access_token");
    if (userFromCookie) {
      router.push({
        path: "/",
      });
      return;
    }

    alert(
      `${user.username} kullanıcısı bulunamadı. Bilgilerinizi lütfen tekrar kontrol edin.`
    );
  }
</script>

<template>
  <main class="authentication-layout">
    <form @submit.prevent="login(userInput)">
      <h3>Oturum Aç</h3>
      <p>
        Hesabın yok mu?
        <nuxt-link to="/register">hemen kayıt ol</nuxt-link>
      </p>
      <input
        v-model="userInput.username"
        autocomplete="username"
        type="text"
        name="username"
      />
      <input
        v-model="userInput.password"
        type="password"
        autocomplete="password"
        name="password"
      />
      <input type="submit" value="Login" />
    </form>
  </main>
</template>

<style lang="postcss" scoped>
  main {
    background-image: url(http://localhost:3000/_ipx/authentication/kitten-login.jpg?w=1080&fit=cover);
  }
</style>
