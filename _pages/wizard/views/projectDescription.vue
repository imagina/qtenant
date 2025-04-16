<template>
  <div id="step-project-name" class="full-width row justify-center">
    <div id="step-project-name-content" class="tw-text-center tw-px-6">
      <!-- Title -->
      <div class="text-cyan tw-font-bold tw-text-2xl tw-mb-6">
        {{ stepTitle }}
      </div>
      <!--Description-->
      <div
        class="tw-text-md md:tw-text-lg tw-mb-6"
        v-html="stepDescription"
      ></div>
      <!-- input -->
      <div class="tw-px-2 md:tw-px-10 tw-mb-8">
        <dynamic-field
          v-model="form.categoryId"
          :field="formFields.categoryId"
        />
        <dynamic-field
          v-model="form.businessDescription"
          :field="formFields.businessDescription"
        />
      </div>
      <!--Image-->
      <q-img fit="contain" :src="stepImage" class="tw-h-44" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import categories from '../../../_crud/categories.vue';

export default {
  setup() {
    return inject('controller'); // Inject the controller;
  },
  data() {
    return {
      stepTitle: '(pt)¿En qué categoría encaja tu negocio?',
      stepImage:
        'https://weygo-v10.ozonohosting.com/modules/isite/img/gamification/ai.png',
      stepDescription:
        '(pt) Selecciona la categoría que mejor describa tu negocio y cuéntanos brevemente de qué se trata. Esta información nos ayudará a personalizar mejor tu sitio web.',
    };
  },
  computed:{
    formFields() {
      return {
        categoryId: {
          type: 'select',
          props: {
            label: this.$tr('isite.cms.form.category') + '*',
            color: 'primary',
            rounded: true,
            dense: false,
            options: this.categories.map((item) => ({
              label: item.title,
              value: item.id,
            })),
          },
        },
        businessDescription: {
          value: '',
          type: 'input',
          props: {
            label: this.$tr('isite.cms.form.description'),
            type: 'textarea',
            rows: '4',
            rounded: true,
            placeholder:
              '(pt)Ejemplo: Ofrecemos comida mexicana casera, como tacos, quesadillas y salsas artesanales. Nos enfocamos en ingredientes frescos y sabores tradicionales.',
          },
        },
      }
    },
  },
  methods: {
    async getData() {
      if (storeWizard.data.organization !== '') {
        this.name = storeWizard.data.organization;
      }
    },
    checkName() {
      if (this.name.length > 5) {
        storeWizard.nextStepButton = true;
        storeWizard.data.organization = this.name;
      } else {
        storeWizard.nextStepButton = false;
      }
    },
    getStepInfo() {
      this.stepContent = storeWizard.infoCompany;
    },
    async checkOrganizationName(name) {
      return new Promise((resolve, reject) => {
        //Requets params
        let requestParams = {
          refresh: true,
          params: {
            filter: { field: 'title' },
          },
        };
        //Request
        this.$crud
          .show('apiRoutes.qsite.organizations', name, requestParams)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            this.$apiResponse.handleError(error, () => {
              reject(error);
            });
          });
      });
    },
  },
};
</script>
<style scope>
#step-project-name #step-project-name-content {
  max-width: 750px;
}
</style>
