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
            'tw-flex tw-flex-col tw-items-center tw-justify-center tw-border-2 tw-rounded-lg',
            'tw-p-4 tw-relative tw-cursor-pointer tw-overflow-hidden tw-h-64',
            'tw-transition-all tw-duration-500 tw-group',
            'hover:tw-scale-105 hover:tw-border-blue-500',
            selectedTheme === theme.name
              ? 'tw-border-blue-500 tw-shadow-lg' // Selected effect
              : 'tw-border-gray-300',
          ]"
        >
          <!-- Theme Image with Scroll Effect on Hover -->
          <div class="tw-w-full tw-h-48 tw-overflow-hidden tw-rounded-md tw-relative tw-transition-all tw-duration-500 hover:tw-h-80 hover:tw-overflow-y-auto">
            <img :src="theme.image" :alt="theme.title" class="tw-w-full tw-object-cover tw-object-top" />
          </div>

          <!-- Theme Title -->
          <div class="tw-text-center tw-text-sm tw-font-medium tw-mt-2">
            {{ theme.title }}
          </div>

          <!-- Check Icon for Selected Theme -->
          <q-icon
            v-if="selectedTheme === theme.name"
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
      stepDescription: "(pt)Select a theme that best matches your style.",
      selectedTheme: null,
      themes: [
        { name: "modern", title: "Modern Style", image: "https://images.pexels.com/photos/3184450/pexels-photo-3184450.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
        { name: "classic", title: "Classic Look", image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
        { name: "minimalist", title: "Minimalist Design", image: "https://images.pexels.com/photos/7060816/pexels-photo-7060816.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
        { name: "dark", title: "Dark Mode", image: "https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
        { name: "colorful", title: "Colorful Theme", image: "https://images.pexels.com/photos/2876787/pexels-photo-2876787.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
        { name: "elegant", title: "Elegant Feel", image: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
        { name: "business", title: "Business Theme", image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
        { name: "portfolio", title: "Portfolio Showcase", image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
        { name: "tech", title: "Tech & Innovation", image: "https://images.pexels.com/photos/11813138/pexels-photo-11813138.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
        { name: "creative", title: "Creative Agency", image: "https://images.pexels.com/photos/3768883/pexels-photo-3768883.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" }
      ]
    };
  },
  methods: {
    selectTheme(theme) {
      this.selectedTheme = theme.name;
    },
  },
};
</script>

<style scoped>
#step-theme-selection #step-theme-selection-content {
  max-width: 750px;
}
</style>
