<template>
  <div id="tenant-wizard" class="tw-h-screen overflow-none relative-position">
    <!--Logo-->
    <div id="logo" class="flex justify-center tw-bg-white">
      <a :href="urlBase">
        <img :src="logo" class="tw-h-20 tw-w-auto" />
      </a>
    </div>
    <!-- Scroll Area (view heihgt - logo height - progress actions)-->
    <q-scroll-area style="height: calc(100vh - 80px - 75px); width: 100%">
      <div id="wizard-content" class="row tw-py-10">
        <!--left component-->
        <div
          id="left"
          v-if="leftComponent"
          :class="rightComponent ? 'col-12 col-md-6' : 'col-12'"
        >
          <!-- Dybnamic Left Component -->
          <component class="left-component" :is="leftComponent" />
        </div>
        <!--right component-->
        <div
          id="right"
          v-if="rightComponent"
          class="row col-6 gt-sm items-center"
        >
          <component class="right-component" :is="rightComponent" />
        </div>
      </div>
    </q-scroll-area>
    <!-- Progress Action -->
    <div id="stepper" class="row justify-center full-width">
      <div class="tw-w-full md:tw-w-1/2">
        <!--Linear Progress-->
        <q-linear-progress
          size="sm"
          color="green"
          track-color="cyan"
          :value="progress"
        />
        <!-- Navigation -->
        <div
          class="row tw-p-4"
          :class="{
            'justify-between': actions.length > 1,
            'justify-center': actions.length === 1,
          }"
        >
          <q-btn
            v-for="(act, key) in actions"
            :key="key"
            @click="act.method"
            rounded
            no-caps
            color="green"
            v-bind="act.props"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from 'vue';
import controller from 'modules/qtenant/_pages/wizard/controller';

export default defineComponent({
  setup(props, { emit }) {
    // Initialize the controller instance
    const controllerInstance = controller(props, emit);
    // Provide the controller for child components
    provide('controller', controllerInstance);
    // Return the controller instance to make it available to the template
    return controllerInstance;
  },
});
</script>
<style lang="scss">
#tenant-wizard {
  background-color: #e4e2f2;

  #logo {
    width: 100%;
    height: 80px;
    box-shadow: 0 0 6px -2px #8d8d8d;
  }

  .q-scrollarea__content {
    display: flex;
    align-items: center;
    justify-content: center; /* Optional: Center horizontally as well */
  }

  #stepper {
    height: 75px;
  }

  .left-component {
    -webkit-animation: fade-in-left 0.6s ease;
    animation: fade-in-left 0.6s ease;
  }

  #right {
    background-color: #fdfdfd;
  }
}

@keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
    transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
