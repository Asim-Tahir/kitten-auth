<script lang="ts">
  import { useCookies } from "@vueuse/integrations";
  import ms from "ms";
  import { parseCookie, base64Encode, base64Decode } from "@/utils";
  import { IUser } from "@/types";

  export default defineComponent({
    setup() {
      const router = useRouter();
      const { $content } = useContext();
      const cookie = useCookies(["access_token"]);

      // Input v-model value variables
      const userInput = reactive<IUser>({ username: "demo", password: "demo" });

      function login(username: string, password: string): void {
        // Get cookie(access_token)
        const accessTokenCookie = cookie.get<string | undefined>(
          "access_token"
        );

        // If cookie(access_token) existed.
        if (accessTokenCookie) {
          const parsedUserFromCookie = parseCookie(
            base64Decode(accessTokenCookie)
          );

          if (parsedUserFromCookie) {
            if (
              parsedUserFromCookie.username === username &&
              parsedUserFromCookie.password === password
            ) {
              router.beforeEach((to, _from, next) => {
                to.meta!.user = {
                  username: parsedUserFromCookie.username,
                  password: parsedUserFromCookie.password,
                  name: parsedUserFromCookie.name,
                } as IUser;

                next();
              });

              // Send back to the page came from
              router.back();
            }
          }
        }

        // If cookie(access_token) not exist,
        // check user in @nuxt/content cms(users.json)
        const users = useAsync(
          () =>
            $content("users")
              // .where({
              //   username: { $eq: username },
              //   password: { $eq: password },
              // })
              .fetch(),
          "92f1b1ce-4fcc-5e99-9af7-d58cce6355b5"
        );

        // User finded successfully
        if (users.value && users.value.length > 0) {
          // Set cookie(access_token) with 1 week expire time
          cookie.set("access_token", base64Encode(`${username}:${password}`), {
            expires: new Date(Date.now() + ms("1w")),
          });

          router.beforeEach((to, _from, next) => {
            to.meta!.user = users.value;

            next();
          });

          console.info(`${username} login successfully`);

          // Send back to the page came from
          router.back();
        }

        // If user authentication failed, show warning message
        console.warn(
          `${username} kullanıcısı bulunamadı. Bilgilerini lütfen tekrar kontrol et.`
        );
      }

      return { userInput, login };
    },
  });
</script>

<template>
  <form @submit.prevent="login(userInput.username, userInput.password)">
    <h3>Login</h3>
    <p>
      Don't have an account,
      <nuxt-link to="/register">register now</nuxt-link>
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
    <input type="submit" />
  </form>
</template>

<!-- <style lang="postcss" scoped></style> -->
