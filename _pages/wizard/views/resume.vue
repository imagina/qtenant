<template>
  <div id="step-resume" class="full-width row justify-center">
    <div id="step-resume-content" class="tw-text-center tw-px-6">
      <!-- Title -->
      <div class="text-cyan tw-font-bold tw-text-2xl tw-mb-6">
        Your Project Summary
      </div>
      <!-- Description -->
      <div class="tw-text-md md:tw-text-lg tw-mb-16">
        We are excited to create this for you! Below is an overview of your selections.
      </div>

      <!-- Project Title Section -->
      <div class="tw-flex tw-justify-between tw-items-center tw-mb-6 tw-bg-white tw-shadow-md tw-rounded-lg tw-p-4">
        <div class="tw-text-left">
          <h2 class="tw-text-lg tw-font-semibold tw-text-gray-700">
            Project Name:
          </h2>
          <p class="tw-text-gray-600 tw-text-lg">
            {{ form.title || 'No title selected' }}
          </p>
        </div>
        <q-btn
          label="(pt)Edit"
          @click="setStep('projectName')"
          no-caps class="q-ml-md"
          rounded color="green"
          outline
        />
      </div>

      <!-- Content Grid -->
      <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
        <!-- Selected Modules -->
        <div class="tw-bg-white tw-shadow-md tw-rounded-lg tw-p-4 tw-relative">
          <div class="tw-flex tw-justify-between tw-items-center">
            <h2 class="tw-text-lg tw-font-semibold tw-text-gray-700">
              Selected Features
            </h2>
            <q-btn
              label="(pt)Edit"
              @click="setStep('modules')"
              no-caps class="q-ml-md"
              rounded color="green"
              outline
            />
          </div>

          <div
            class="tw-mt-4 tw-h-48 tw-overflow-y-auto tw-scrollbar-thin tw-scrollbar-thumb-gray-300"
          >
            <div
              v-for="module in selectedModules"
              :key="module.name"
              class="tw-flex tw-items-center tw-border tw-rounded-lg tw-p-4 tw-shadow-sm tw-mb-2"
            >
              <q-icon
                :name="module.icon"
                class="tw-text-2xl tw-text-blue-500 tw-mr-3"
              />
              <div class="tw-text-sm tw-font-medium tw-text-gray-700">
                {{ module.title }}
              </div>
            </div>
          </div>
        </div>

        <!-- Selected Theme -->
        <div class="tw-bg-white tw-shadow-md tw-rounded-lg tw-p-4 tw-relative">
          <div class="tw-flex tw-justify-between tw-items-center">
            <h2 class="tw-text-lg tw-font-semibold tw-text-gray-700">
              Selected Theme
            </h2>
            <q-btn
              label="(pt)Edit"
              @click="setStep('themes')"
              no-caps class="q-ml-md"
              rounded color="green"
              outline
            />
          </div>

          <div class="tw-mt-4 tw-overflow-hidden tw-rounded-md">
            <img
              :src="selectedTheme.image"
              :alt="selectedTheme.title"
              class="tw-w-full tw-h-56 tw-object-cover tw-rounded-md"
            />
          </div>
          <div
            class="tw-text-lg tw-font-medium tw-mt-3 tw-text-gray-700 tw-text-center"
          >
            {{ selectedTheme.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default {
  setup() {
    return inject('controller'); // Inject the controller
  },
  computed: {
    selectedModules() {
      return this.modules.filter((module) =>
        this.form.selectedModules.includes(module.name)
      );
    },
    selectedTheme() {
      return (
        this.themes.find((theme) => theme.name === this.form.selectedTheme) ||
        {}
      );
    },
  },
};
</script>

<style scoped>
#step-resume #step-resume-content {
  max-width: 750px;
}
</style>
