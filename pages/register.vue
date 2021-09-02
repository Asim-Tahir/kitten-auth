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
      <nuxt-link to="/">
        <h1 class="font-brand">kittini</h1>
      </nuxt-link>
      <h3>Kayıt Ol</h3>
      <p>
        Zaten bir hesabın var mı?
        <nuxt-link to="/login" class="link">Oturum aç</nuxt-link>
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

      <label for="kullanim-kosullari" class="select-none cursor-pointer">
        <input id="kullanim-kosullari" type="checkbox" required />
        <nuxt-link to="/disclaimer/kullanim-kosullari" class="link">
          Kullanım koşullarını
        </nuxt-link>
        <span>ve</span>
        <nuxt-link to="/disclaimer/gizlilik-politikasi" class="link">
          gizlilik politikasını
        </nuxt-link>
        okudum ve kabul ediyorum.
      </label>

      <input type="submit" value="Kayıt ol" />
    </form>
  </main>
</template>

<style lang="postcss" scoped>
  /* stylelint-disable */
  input[type="checkbox"],
  input[type="radio"] {
    --active: #275efe;
    --active-inner: #fff;
    --focus: 2px rgba(39, 94, 254, 0.3);
    --border: #bbc1e1;
    --border-hover: #275efe;
    --background: #fff;
    --disabled: #f6f8ff;
    /* --disabled-inner: #e1e6f9;
    --active: #275efe;
    --active-inner: #fff;
    --focus: 2px rgba(39, 94, 254, 0.3);
    --border: #bbc1e1;
    --border-hover: #275efe;
    --background: #fff;
    --disabled: #f6f8ff;
    --disabled-inner: #e1e6f9; */
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 21px;
    outline: none;
    display: inline-block;
    vertical-align: top;
    position: relative;
    margin: 0;
    cursor: pointer;
    border: 1px solid var(--bc, var(--border));
    background: var(--b, var(--background));
    transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
    &:after {
      content: "";
      display: block;
      left: 0;
      top: 0;
      position: absolute;
      transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
        opacity var(--d-o, 0.2s);
    }
    &:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: 0.3s;
      --d-t: 0.6s;
      --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
    }
    &:disabled {
      --b: var(--disabled);
      cursor: not-allowed;
      opacity: 0.9;
      &:checked {
        --b: var(--disabled-inner);
        --bc: var(--border);
      }
      & + label {
        cursor: not-allowed;
      }
    }
    &:hover {
      &:not(:checked) {
        &:not(:disabled) {
          --bc: var(--border-hover);
        }
      }
    }
    &:focus {
      box-shadow: 0 0 0 var(--focus);
    }
    &:not(.switch) {
      width: 21px;
      &:after {
        opacity: var(--o, 0);
      }
      &:checked {
        --o: 1;
      }
    }
    & + label {
      font-size: 14px;
      line-height: 21px;
      display: inline-block;
      vertical-align: top;
      cursor: pointer;
      margin-left: 4px;
    }
  }
  input[type="checkbox"] {
    &:not(.switch) {
      border-radius: 7px;
      &:after {
        width: 5px;
        height: 9px;
        border: 2px solid var(--active-inner);
        border-top: 0;
        border-left: 0;
        left: 7px;
        top: 4px;
        transform: rotate(var(--r, 20deg));
      }
      &:checked {
        --r: 43deg;
      }
    }
    &.switch {
      width: 38px;
      border-radius: 11px;
      &:after {
        left: 2px;
        top: 2px;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        background: var(--ab, var(--border));
        transform: translateX(var(--x, 0));
      }
      &:checked {
        --ab: var(--active-inner);
        --x: 17px;
      }
      &:disabled {
        &:not(:checked) {
          &:after {
            opacity: 0.6;
          }
        }
      }
    }
  }
  input[type="radio"] {
    border-radius: 50%;
    &:after {
      width: 19px;
      height: 19px;
      border-radius: 50%;
      background: var(--active-inner);
      opacity: 0;
      transform: scale(var(--s, 0.7));
    }
    &:checked {
      --s: 0.5;
    }
  }
</style>
