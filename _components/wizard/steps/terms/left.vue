<template>
  <div class="row justify-center align-center">
    <div class="col-12 col-sm-10 col-md-11">
      <div class="tw-mx-auto tw-text-base tw-max-w-sm">
        <q-checkbox dense v-model="data.termsAndConditions" color="primary" />
        Condiciones de uso Sí, quiero recibir correos electrónicos con consejos
        prácticos, novedades y ofertas especiales para mi página web.
      </div>

      <div class="tw-flex tw-overflow-hidden tw-mb-3">
        <q-checkbox dense v-model="data.privacyPolicy" color="primary" />
        <div class="tw-mx-auto tw-text-base tw-max-w-sm">
          Declaro que he leído y acepto Politica de Privacidad,Terminos y
          Condiciones, de My Site
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  reactive,
  computed,
  watchEffect,
  watch,
  onMounted,
  defineEmits,
} from 'vue';

const { getCache } = defineProps(['getCache']);
const emit = defineEmits(['activeNextStep', 'setCache']);

const nameStep = 'terms';

const data = reactive({
  termsAndConditions: false,
  privacyPolicy: false,
});

onMounted(async () => {
  if (typeof getCache === 'function') {
    const dataCache = (await getCache(nameStep)) || {};
    data.termsAndConditions = dataCache.termsAndConditions || false;
    data.privacyPolicy = dataCache.privacyPolicy || false;
  }
});

const validateForm = computed(() => !data.privacyPolicy);

watchEffect(() => {
  emit('activeNextStep', validateForm.value);
});

watch(
  () => ({ ...data }),
  (newData) => {
    emit('setCache', nameStep, newData);
  },
  { deep: true }
);
</script>
