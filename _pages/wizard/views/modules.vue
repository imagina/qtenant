<template>
  <div id="step-project-name" class="full-width row justify-center">
    <div id="step-project-name-content" class="tw-text-center tw-px-6">
      <!-- Title -->
      <div class="text-cyan tw-font-bold tw-text-2xl tw-mb-6">
        {{ stepTitle }}
      </div>
      <!--Description-->
      <div
        class="tw-text-md md:tw-text-lg tw-mb-16"
        v-html="stepDescription"
      ></div>
      <!--Choose modules-->
      <div
        class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-4"
      >
        <div
          v-for="(module, index) in modulesTenantConfig"
          :key="index"
          @click="toggleSelect(module)"
          :class="[
            'tw-flex tw-flex-col tw-items-center tw-justify-center',
            'tw-bg-white tw-shadow-md tw-rounded-lg',
            'tw-rounded-lg tw-p-4 tw-relative tw-cursor-pointer',
            'tw-transition-all tw-duration-300 tw-group',
            'md:hover:tw-scale-105 md:hover:tw-border-blue-500',
            form.selectedModules.includes(module.name)
              ? 'tw-border-2 tw-border-blue-500 tw-shadow-lg' // Selected item effect
              : 'tw-border-2 tw-border-white',
          ]"
        >
          <!-- Help Text - Positioned at the Top-Left -->
          <help-text
            :title="module.client.title"
            :description="module.client.description"
            class="tw-absolute tw-top-2 tw-left-2 tw-z-10"
            @click.stop
          />
          <q-icon
            :name="module.client.icon"
            class="tw-text-2xl tw-mb-2"
            color="blue"
            size="28px"
          />
          <div class="tw-text-center tw-text-sm tw-font-medium">
            {{ module.client.title }}
          </div>
          <q-icon
            :name="
              form.selectedModules.includes(module.name)
                ? 'fa-light fa-check-circle'
                : 'fa-light fa-circle'
            "
            size="18px"
            class="tw-text-blue-500 tw-absolute tw-top-2 tw-right-2 tw-transition-opacity tw-duration-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default {
  setup() {
    return inject('controller'); // Inject the controller;
  },
  data() {
    return {
      stepTitle: '(pt)¿Qué necesita tu página?',
      stepDescription:
        '(pt) Tenemos muchas soluciones para ti, selecciona las que mejor se adapten',
    };
  },
  methods: {
    toggleSelect(module) {
      let existIndex = this.form.selectedModules.findIndex(
        (item) => item == module.name
      );
      if (existIndex >= 0) this.form.selectedModules.splice(existIndex, 1);
      else this.form.selectedModules.push(module.name);
    },
  },
};
</script>

<style scoped>
#step-project-name #step-project-name-content {
  max-width: 750px;
}
</style>
