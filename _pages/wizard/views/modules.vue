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
      <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-4">
        <div
          v-for="(module, index) in modules"
          :key="index"
          @click="toggleSelect(module)"
          :class="[
            'tw-flex tw-flex-col tw-items-center tw-justify-center tw-border-2',
            'tw-rounded-lg tw-p-4 tw-relative tw-cursor-pointer',
            'tw-transition-all tw-duration-300 tw-group',
            'hover:tw-scale-105 hover:tw-border-blue-500',
            form.selectedModules.includes(module.name)
              ? 'tw-border-blue-500 tw-shadow-lg' // Selected item effect
              : 'tw-border-gray-300',
          ]"
        >
          <q-icon :name="module.icon" class="tw-text-2xl tw-mb-2" color="blue" />
          <div class="tw-text-center tw-text-sm tw-font-medium">
            {{ module.title }}
          </div>
          <q-icon
            v-if="form.selectedModules.includes(module.name)"
            name="fa-light fa-check-circle" size="18px"
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
      modules: [
        { name: "ecommerce", title: "Sell Online", icon: "fal fa-shopping-cart" },
        { name: "reservations", title: "Get Reservations", icon: "fal fa-calendar-check" },
        { name: "documents", title: "Manage Documents", icon: "fal fa-file-alt" },
        { name: "chat", title: "Live Chat Support", icon: "fal fa-comments" },
        { name: "blog", title: "Share Blog Posts", icon: "fal fa-newspaper" },
        { name: "analytics", title: "Track Analytics", icon: "fal fa-chart-line" },
        { name: "membership", title: "Membership System", icon: "fal fa-id-card" },
        { name: "notifications", title: "Send Notifications", icon: "fal fa-bell" },
        { name: "tasks", title: "Manage Tasks", icon: "fal fa-tasks" },
        { name: "wallet", title: "Digital Wallet", icon: "fal fa-wallet" },
      ]
    };
  },
  methods: {
    toggleSelect(module) {
      let existIndex = this.form.selectedModules.findIndex(item => item == module.name)
      if(existIndex >= 0) this.form.selectedModules.splice(existIndex, 1)
      else this.form.selectedModules.push(module.name)
    },
  },
};
</script>

<style scoped>
#step-project-name #step-project-name-content {
  max-width: 750px;
}
</style>
