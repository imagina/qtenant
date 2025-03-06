<template>
  <div id="step-welcome" class="full-width row justify-center">
    <div id="step-welcome-content" class="tw-text-center tw-px-6">
      <!--Image-->(pt)
      <q-img fit="contain" :src="stepImage" class="tw-h-44 tw-mb-10" />
      <!--Title-->
      <div class="text-cyan tw-font-bold tw-text-2xl tw-mb-6">
        {{ stepTitle }}
      </div>
      <!--Description-->
      <div
        class="tw-text-md md:tw-text-lg tw-mb-6"
        v-html="stepDescription"
      ></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';

export default {
  setup ()
  {
    return inject('controller'); // Inject the controller;
  },
  data ()
  {
    return {
      stepTitle: '(pt)¡Bienvenido!',
      stepImage:
        'https://weygo-v10.ozonohosting.com/modules/isite/img/gamification/welcome.png',
      stepDescription:
        '(pt) Aquí podras crear tu sitio de manera sencilla y eficiente. te guiaremos en cada paso para que puedas expresar tu visión en línea. ¡Comencemos a crear tu sitio!'
    };
  }
};
</script>
<style scope>
#step-welcome #step-welcome-content {
  max-width: 750px;
}
</style>
