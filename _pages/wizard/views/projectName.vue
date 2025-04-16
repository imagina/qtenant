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
        <dynamic-field v-model="form.title" :field="formFields.nameOrganizations" />
      </div>
      <!--Image-->
      <q-img fit="contain" :src="stepImage" class="tw-h-44" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';

export default {
  setup ()
  {
    return inject('controller'); // Inject the controller;
  },
  data ()
  {
    return {
      stepTitle: '(pt)¿Cuál es el nombre de tu proyecto?',
      stepImage: 'https://weygo-v10.ozonohosting.com/modules/isite/img/gamification/organization.png',
      stepDescription: '(pt) El nombre de tu proyecto es la base para armar tu sitio web, sera el elemento que se usara para identificarlo.',
      formFields: {
        nameOrganizations: {
          type: 'input',
          props: {
            icon: 'fa-light fa-registered',
            label: this.$tr('isite.cms.form.name')+'*',
            color: 'primary',
            rounded: true,
            dense: false,
            autofocus: true,
            placeholder: '(pt)Por Ej. Restaurante Mil Delicias'
          }
        }
      }
    };
  },
  methods: {
    async getData ()
    {
      if (storeWizard.data.organization !== '')
      {
        this.name = storeWizard.data.organization;
      }
    },
    checkName ()
    {
      if (this.name.length > 5)
      {
        storeWizard.nextStepButton = true;
        storeWizard.data.organization = this.name;
      } else
      {
        storeWizard.nextStepButton = false;
      }
    },
    getStepInfo ()
    {
      this.stepContent = storeWizard.infoCompany;
    },
    async checkOrganizationName (name)
    {
      return new Promise((resolve, reject) =>
      {
        //Requets params
        let requestParams = {
          refresh: true,
          params: {
            filter: { field: 'title' }
          }
        };
        //Request
        this.$crud
          .show('apiRoutes.qsite.organizations', name, requestParams)
          .then((response) =>
          {
            resolve(response.data);
          })
          .catch((error) =>
          {
            this.$apiResponse.handleError(error, () =>
            {
              reject(error);
            });
          });
      });
    }
  }
};
</script>
<style scope>
#step-project-name #step-project-name-content {
  max-width: 750px;
}
</style>
