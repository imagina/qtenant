<template>
  <div class="step-company">
    <div class="tw-px-2 md:tw-px-10 tw-mb-8">
      <dynamic-field v-model="data.name" :field="inputField" />
    </div>
  </div>
</template>
<script setup>
import baseService from 'src/modules/qcrud/_services/baseService';
import apiResponse from 'src/modules/qcrud/_plugins/apiResponse';

import { reactive, watchEffect, onMounted, defineEmits } from 'vue';

const { getCache } = defineProps(['getCache']);
const emit = defineEmits(['activeNextStep', 'setCache']);

const nameStep = 'company';

const data = reactive({
  name: '',
});

const inputField = {
  type: 'input',
  props: {
    icon: 'fa-duotone fa-regular fa-building',
    label: 'isite.cms.form.name',
    color: 'primary',
    rounded: true,
    dense: false,
  },
};

onMounted(async () => {
  if (typeof getCache === 'function') {
    const dataCache = (await getCache(nameStep)) || {};

    data.name = dataCache.name || '';
    console.log(data.name !== '');
    if (data.name !== '') emit('activeNextStep', false);
  }
});

watchEffect(async () => {
  if (data.name) {
    await validateField(data.name);
  }
});

const validateField = async (field) => {
  if (field.length >= 3) {
    const validateOrganization = await checkOrganizationName(data.name);
    if (validateOrganization.data === undefined) {
      emit('setCache', nameStep, { ...data });
      emit('activeNextStep', false);
    }
  } else {
    emit('activeNextStep', true);
  }
};

async function checkOrganizationName(name) {
  return new Promise((resolve, reject) => {
    //Requets params
    let requestParams = {
      refresh: true,
      params: {
        filter: { field: 'title' },
      },
    };
    //Request
    baseService
      .show('apiRoutes.qsite.organizations', name, requestParams)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        apiResponse.handleError(error, () => {
          reject(error);
        });
      });
  });
}
</script>
