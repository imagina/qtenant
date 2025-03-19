<template>
  <div
    class="tw-fixed tw-inset-0 tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-z-50"
  >
    <template v-if="!redirectUrl">
      <!-- Loading Spinner -->
      <q-spinner-grid color="blue" size="50px" />

      <!-- Title -->
      <h2 class="tw-text-xl tw-font-semibold tw-text-gray-700 tw-mt-4">
        Creating your project...
      </h2>

      <!-- Subtitle / Status Message -->
      <p class="tw-text-gray-600 tw-mt-2">
        {{ message }}
      </p>
    </template>

    <template v-else>
      <!-- Success Icon -->
      <i class="fa-light fa-check-circle tw-text-green-500 tw-text-6xl"></i>

      <!-- Success Title -->
      <h2 class="tw-text-xl tw-font-semibold tw-text-gray-700 tw-mt-4">
        Your project is ready to start!
      </h2>

      <!-- Subtitle / Status Message -->
      <p class="tw-text-gray-600 tw-mt-2">Click the button below to proceed.</p>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default {
  setup() {
    return inject('controller'); // Inject the controller
  },
  data() {
    return {
      message: 'We are setting up everything for you.',
    };
  },
};
</script>
