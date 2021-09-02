<script lang="ts" setup>
  // @ts-ignore
  import { ContentLoader } from "vue-content-loader";
  import { useKittenStore } from "@/store";

  const store = useKittenStore();

  interface ITransitions {
    [key: string]: {
      name: string;
      "enter-active-class": string;
      "enter-to-class"?: string;
      "leave-active-class": string;
      "leave-to-class"?: string;
    };
  }

  const transitions = ref<ITransitions>({
    fade: {
      name: "fade",
      "enter-active-class": "animate__animated animate__fadeIn",
      "leave-active-class": "animate__animated animate__slow animate__fadeOut",
    },
    flip: {
      name: "flip",
      "enter-active-class": "animate__animated animate_slow animate__flipInX",
      "leave-active-class": "animate__animated animate__slow animate__flipOutX",
    },
    bounce: {
      name: "bounce",
      "enter-active-class": "animate__animated animate__bounceIn",
      "leave-active-class":
        "animate__animated animate__bounceOut",
    },
    rotate: {
      name: "rotate",
      "enter-active-class": "animate__animated animate__slow animate__rotateIn",
      "leave-active-class":
        "animate__animated animate__slow animate__rotateOut",
    },
    zoom: {
      name: "zoom",
      "enter-active-class": "animate__animated animate__slow animate__zoomIn",
      "leave-active-class": "animate__animated animate__slow animate__zoomOut",
    },
    slide: {
      name: "slide",
      "enter-active-class":
        "animate__animated animate__slideInDown",
      "leave-active-class":
        "animate__animated animate__slow animate__slideOutUp",
    },
  });

  const currentTransition = ref(transitions.value.fade);

  // const { $img } = useContext();

  const loading = ref(true);
  store.fetchKitten().finally(() => (loading.value = false));

  const url = computed(() => store.getKittenURL);

  function pickRandomTransition(obj: ITransitions) {
    const keys = Object.keys(obj);
    return obj[keys[(keys.length * Math.random()) << 0]];
  }

  function changeImage() {
    loading.value = true;
    currentTransition.value = pickRandomTransition(transitions.value);
    console.info(
      `Şuanki geçiş efekti: %c${currentTransition.value.name}`,
      "🐦;background: lightblue; color: #111; padding: 3px 6px; border-radius: 5px;"
    );
    store.fetchKitten().finally(() => {
      loading.value = false;
    });
  }
</script>

<template>
  <main
    class="
      flex flex-col
      items-center
      justify-center
      relative
      w-[400px]
      mx-auto
      my-10
      space-y-4
    "
  >
    <h1 class="font-brand">kittini</h1>

    <div class="relative w-full h-[400px]">
      <transition
        :enter-active-class="currentTransition['enter-active-class']"
        :leave-active-class="currentTransition['leave-active-class']"
        :mode="'in-out'"
        appear
        type="animation"
      >
        <content-loader
          v-if="loading"
          class="absolute w-full z-10"
          :width="400"
          :height="400"
          :speed="1"
          primary-color="#a0a0a0"
          secondary-color="#bebebe"
        >
          <rect :x="0" :y="0" :rx="12" :width="400" :height="400" />
        </content-loader>
        <nuxt-img
          v-else
          :src="url"
          class="rounded-xl absolute w-full z-0"
          fit="cover"
          height="400"
          width="400"
          animate="true"
        />
      </transition>
    </div>

    <button class="w-full" @click="changeImage()">Değiştir</button>
  </main>
</template>

<!-- <style lang="postcss" scoped>
  /* fade transition */
  .fade-enter-active,
  .fade-leave-active {
    @apply transition-opacity opacity-100 ease-linear delay-100;
  }

  .fade-enter-from,
  .fade-leave-to {
    @apply transition-opacity opacity-0 ease-linear delay-500;
  }

  /* flip transition */
  .flip-enter-active {
    transition-timing-function: cubic-bezier(
      0.55,
      0.085,
      0.68,
      0.53
    ); /*ease-in-quad*/

    @apply transition-all duration-200;
  }

  .flip-leave-active {
    transition-timing-function: cubic-bezier(
      0.25,
      0.46,
      0.45,
      0.94
    ); /*ease-out-quad*/

    @apply transition-all duration-500;
  }

  .flip-enter,
  .flip-leave-to {
    transform: scaleY(0) translateZ(0);
    opacity: 0;
  }

  /* pop transition */

  .pop-enter-active,
  .pop-leave-active {
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.8s linear;

    @apply transform scale-100;
  }

  .pop-enter {
    @apply opacity-0;
    transform: scale(0.8) translateY(-50%);
  }
  .pop-leave-to {
    @apply opacity-100;
    transform: scale(1) translateY(0);
  }
</style> -->
