<template>
  <div id="step-theme-selection" class="full-width row justify-center">
    <div id="step-theme-selection-content" class="tw-text-center tw-px-6">
      <!-- Title -->
      <div class="text-cyan tw-font-bold tw-text-2xl tw-mb-6">
        {{ stepTitle }}
      </div>
      <!-- Description -->
      <div class="tw-text-md md:tw-text-lg tw-mb-16" v-html="stepDescription"></div>

      <!-- Choose Theme -->
      <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-6">
        <div
          v-for="(theme, index) in themes"
          :key="index"
          @click="selectTheme(theme)"
          :class="[
            'tw-flex tw-flex-col tw-items-center tw-justify-center',
            'tw-p-4 tw-relative tw-cursor-pointer tw-overflow-hidden tw-h-64',
            'tw-bg-white tw-shadow-md tw-rounded-lg',
            'tw-transition-all tw-duration-500 tw-group',
            'hover:tw-scale-105 hover:tw-border-blue-500',
            form.selectedTheme === theme.id
              ? 'tw-border-2 tw-border-blue-500 tw-shadow-lg' // Selected effect
              : 'tw-border-2 tw-border-white',
          ]"
        >
          <!-- Theme Image with Scroll Effect on Hover -->
          <div class="tw-w-full tw-h-48 tw-overflow-hidden tw-rounded-md tw-relative tw-transition-all tw-duration-500 hover:tw-h-80 hover:tw-overflow-y-auto">
            <img :src="theme.mediaFiles.internalimage.mediumThumb" :alt="theme.title" class="tw-w-full tw-object-cover tw-object-top" />
          </div>

          <!-- Theme Title -->
          <div class="tw-text-center tw-text-sm tw-font-medium tw-mt-2">
            {{ theme.title }}
          </div>

          <!-- Check Icon for Selected Theme -->
          <q-icon
            v-if="form.selectedTheme === theme.name"
            name="fa-light fa-check-circle"
            size="20px"
            class="tw-text-blue-500 tw-absolute tw-top-2 tw-right-2 tw-transition-opacity tw-duration-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default {
  setup() {
    return inject("controller"); // Inject the controller;
  },
  data() {
    return {
      stepTitle: "(pt)Choose Your Theme",
      stepDescription: "(pt)Select a theme that best matches your style."
    };
  },
  methods: {
    selectTheme(theme) {
      this.form.selectedTheme = theme.id;
    },
  },
};
</script>

<style scoped>
#step-theme-selection #step-theme-selection-content {
  max-width: 750px;
}
</style>
