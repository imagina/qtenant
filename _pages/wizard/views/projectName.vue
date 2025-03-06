<template>
  <div class="step-company">
    <div class="tw-pt-10">
      <h2 class="step-title">{{ stepTitle }}</h2>
      <div
        class="tw-text-base tw-px-2 md:tw-px-14 tw-text-center tw-mb-10"
        v-html="stepDescription"
      ></div>
    </div>

    <div class="tw-px-2 md:tw-px-10 tw-mb-8">
      <dynamic-field v-model="form.title" :field="formFields.nameOrganizations" />
    </div>

    <div class="step-sidebar">
      <div class="select-company tw-max-w-md tw-w-full">
        <q-img fit="contain" :src="stepImage"/>
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
      stepTitle: '(pt)¿Cuál es el nombre de tu proyecto?',
      stepImage:
        'https://weygo-v10.ozonohosting.com/modules/isite/img/gamification/organization.png',
      stepDescription:
        '(pt) El nombre de tu proyecto es la base para armar tu sitio web, sera el elemento que se usara para identificarlo.',
    };
  },
  computed: {
    formFields() {
      return {
        nameOrganizations: {
          type: 'input',
          props: {
            icon: 'fa-light fa-registered',
            label: this.$tr('isite.cms.form.name'),
            color: 'primary',
            rounded: true,
            dense: false,
          },
        },
      };
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
<!--<script>
import storeWizard from './store/index.ts';

export default {
  data() {
    return {
      name: '',
      stepContent: '',
    };
  },
  mounted() {
    this.$nextTick(async function () {
      this.checkName();
      this.getData();
      this.getStepInfo();
    });
  },
  watch: {
    name(newName, oldName) {
      this.checkName();
    },
  },


};
</script>-->
<style>
.select-company {
  -webkit-animation: fade-in-left 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in-left 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

.step-company {
  @apply tw-flex tw-flex-col tw-justify-center;
  height: calc(100vh - 320px);
}
</style>
