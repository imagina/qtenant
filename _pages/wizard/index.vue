<template>
  <div
    id="tenant-wizard"
    class="tw-h-screen overflow-auto row items-stretch relative-position"
  >
    <!--Inner Loading-->
    <inner-loading :visible="loading" />
    <!-- Top Content -->
    <div id="logo" class="flex justify-center tw-bg-white">
      <!--Logo-->
      <a :href="urlBase">
        <img :src="logo" class="tw-h-20 tw-w-auto" />
      </a>
      <!--Progress-->
      <q-linear-progress
        size="sm"
        color="green"
        track-color="transparent"
        :value="progress"
      />
    </div>
    <!--left component-->
    <div
      id="left"
      v-if="currentStep?.left"
      class="row"
      :class="currentStep.right ? 'col-12 col-md-6' : 'col-12'"
    >
      <!-- Dybnamic Left Component -->
      <component class="left-component" :is="leftComponent" />

      <div id="stepper" :class="isMobile ? 'tw-w-full' : 'tw-w-1/2'">
        <!-- Progress Actions-->
        <div class="row justify-between">
          <div class="col-4 q-pa-md">
            <q-btn
              rounded
              no-caps
              :disabled="false"
              unelevated
              color="blue-grey"
              icon="fa-light fa-arrow-left"
              @click="previousStep()"
              :label="isMobile ? '' : $tr('isite.cms.label.previous')"
              v-if="currentStepIndex"
            />
          </div>
          <div class="col-4 q-pa-md text-right">
            <q-btn
              rounded
              no-caps
              :disabled="false"
              icon-right="fa-light fa-arrow-right tw-ml-0 sm:tw-ml-2"
              @click="nextStep()"
              unelevated
              color="green"
              :label="isMobile ? '' : $tr('isite.cms.label.continue')"
              v-if="currentStepIndex"
            />
          </div>
        </div>
      </div>
    </div>
    <!--right component-->
    <div
      id="right"
      v-if="currentStep?.right"
      class="row col-6 gt-sm items-center"
    >
      <component class="right-component" :is="rightComponent" />
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
    height: 84px;
    box-shadow: 0 0 6px -2px #8d8d8d;
  }

  #stepper {
    bottom: 0;
    left: 0;
    position: fixed;
  }

  .right-component {
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
