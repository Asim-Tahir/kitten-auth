<script setup lang="ts">
  import { useAuthenticationStore } from "@/store";
  import { getUserFromCookie } from "@/helpers";
  import { IUser } from "@/types";

  const store = useAuthenticationStore();
  const router = useRouter();
  // Cookkie is specified redirect to home
  let userFromCookie = getUserFromCookie("access_token");
  // if (userFromCookie) {
  //   router.push({ path: "/" });
  // }

  // Input v-model value variables
  const userInput = reactive<IUser>({
    username: "demo",
    password: "demo",
    name: "Demo",
  });

  function register(user: IUser): void {
    store.register(user);

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
    <form @submit.prevent="register(userInput)">
      <h3>Kayıt Ol</h3>
      <p>
        Zaten bir hesabın var mı?
        <nuxt-link to="/login">Oturum aç</nuxt-link>
      </p>
      <input
        v-model="userInput.name"
        type="text"
        required
        autocomplete="name"
        name="name"
      />
      <input
        v-model="userInput.username"
        autocomplete="username"
        required
        type="text"
        name="username"
      />
      <input
        v-model="userInput.password"
        type="password"
        required
        autocomplete="new-password"
        name="password"
      />

      <svg class="checkbox-symbol">
        <symbol id="check" viewbox="0 0 12 10">
          <polyline
            points="1.5 6 4.5 9 10.5 1"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></polyline>
        </symbol>
      </svg>

      <input
        id="kullanim-kosullari"
        class="checkbox-input"
        name="isTermOfUseAccept"
        required
        type="checkbox"
      />
      <label class="checkbox" for="kullanim-kosullari">
        <span>
          <svg width="12px" height="10px">
            <use xlink:href="#check"></use>
          </svg>
        </span>
        <span>
          <nuxt-link to="/disclaimer/kullanim-kosullari">
            Kullanım koşullarını
          </nuxt-link>
          okudum ve kabul ediyorum.
        </span>
      </label>

      <input type="submit" value="Kayıt ol" />
    </form>
  </main>
</template>

<style lang="postcss" scoped>
  main {
    background-image: url(http://localhost:3000/_ipx/authentication/kitten-register.jpg?w=1080&fit=cover);
  }

  .checkbox-symbol {
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
    user-select: none;
  }

  .checkbox-input {
    position: absolute;
    visibility: hidden;
  }

  .checkbox {
    user-select: none;
    cursor: pointer;
    padding: 6px 8px;
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
  }

  .checkbox:not(:last-child) {
    margin-right: 6px;
  }

  .checkbox:hover {
    background: rgba(0, 119, 255, 0.06);
  }

  .checkbox span {
    vertical-align: middle;
    transform: translate3d(0, 0, 0);
  }

  .checkbox span:first-child {
    position: relative;
    flex: 0 0 18px;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    transform: scale(1);
    border: 2px solid #b1b3bd;
    transition: all 0.3s ease;
  }

  .checkbox span:first-child svg {
    position: absolute;
    top: 3px;
    left: 2px;
    fill: none;
    stroke: #fff;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: all 0.3s ease;
    transform: translate3d(0, 0, 0);
  }

  .checkbox span:last-child {
    padding-left: 8px;
    line-height: 18px;
  }

  .checkbox:hover span:first-child {
    border-color: #0077ff;
  }

  .checkbox-input:checked + .checkbox span:first-child {
    background: #0077ff;
    border-color: #0077ff;
    animation: zoom-in-out 0.3s ease;
  }

  .checkbox-input:checked + .checkbox span:first-child svg {
    stroke-dashoffset: 0;
  }

  @keyframes zoom-in-out {
    50% {
      transform: scale(0.9);
    }
  }
</style>
