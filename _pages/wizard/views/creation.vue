<template>
  <div class="tw-fixed tw-inset-0 tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-z-50">
    <!-- Spinner -->
    <q-spinner-grid color="blue" size="50px" />

    <!-- Title -->
    <h2 class="tw-text-xl tw-font-semibold tw-text-gray-700 tw-mt-4">
      Creating your project...
    </h2>

    <!-- Subtitle / Status Message -->
    <p class="tw-text-gray-600 tw-mt-2">
      This may take a few moments. We are setting up everything for you.
    </p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    message: {
      type: String,
      default: "We are setting up everything for you.",
    },
  },
};
</script>
