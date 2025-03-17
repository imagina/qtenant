import {
  computed,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  shallowRef,
  defineAsyncComponent,
} from 'vue';
import service from './services';
import { useStorage } from '@vueuse/core';
import { cache } from 'src/plugins/utils';

export default function controller(props: any, emit: any) {
  const proxy = getCurrentInstance()!.appContext.config.globalProperties;

  // Refs
  const refs = {
    // refKey: ref(defaultValue)
  };

  const steps = [
    {
      name: 'welcome',
      leftComponent: defineAsyncComponent(
        () => import('modules/qtenant/_pages/wizard/views/welcome.vue')
      ),
    },
    {
      name: 'projectName',
      leftComponent: defineAsyncComponent(
        () => import('modules/qtenant/_pages/wizard/views/projectName.vue')
      ),
    },
    {
      name: 'modules',
      leftComponent: defineAsyncComponent(
        () => import('modules/qtenant/_pages/wizard/views/modules.vue')
      ),
    },
    {
      name: 'themes',
      leftComponent: defineAsyncComponent(
        () => import('modules/qtenant/_pages/wizard/views/themes.vue')
      ),
    },
    {
      name: 'resume',
      leftComponent: defineAsyncComponent(
        () => import('modules/qtenant/_pages/wizard/views/resume.vue')
      ),
    },
    {
      name: 'creation',
      leftComponent: defineAsyncComponent(
        () => import('modules/qtenant/_pages/wizard/views/creation.vue')
      ),
    },
  ];

  // States
  const state = reactive({
    loading: false,
    logo: proxy.$store.state.qsiteApp.logo,
    currentStep: useStorage('tenant-step', 0),
    leftComponent: shallowRef(),
    rightComponent: shallowRef(),

    modules: [],
    themes: [],
    form: { title: null, selectedModules: [], selectedTheme: null },

    systemName: 'qtenant.wizard',
    urlBase: proxy.$store.state.qsiteApp.baseUrl,
  });

  // Computed
  const computeds = {
    isMobile: computed(() => {
      return proxy.$q.screen.lt.md;
    }),
    currentStepIndex: computed(() => {
      if (!state.currentStep) return 0;
      return steps.findIndex((obj) => obj.name === state.currentStep);
    }),
    progress: computed(() => {
      const progressPercent = 1 / steps.length;
      return progressPercent * computeds.currentStepIndex.value;
    }),
  };

  // Methods
  const methods = {
    async init() {
      methods.setStep(state.currentStep);
      methods.getTenantConfigs();
    },
    setStep(stepIndex) {
      const step = steps[stepIndex];
      if (step) {
        state.loading = true;
        state.currentStep = stepIndex;
        state.leftComponent = step.leftComponent ?? shallowRef();
        state.rightComponent = step.rightComponent ?? shallowRef();
        state.loading = false;
      }
    },
    nextStep() {
      methods.setStep(state.currentStep + 1);
    },
    previousStep() {
      methods.setStep(state.currentStep - 1);
    },
    getTenantConfigs() {
      service.getModulesTenantConfig(true).then(async (response) => {
        state.modules = response.client;
        state.themes = await service.getLayouts(response.baseTenantUrl);
      });
    },
  };

  // Mounted
  onMounted(() => {
    methods.init();
  });

  // Watch
  // watch(key, (newField, oldField): void => {
  //
  // }, {deep: true})

  return { ...refs, ...toRefs(state), ...computeds, ...methods };
}
