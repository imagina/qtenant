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
    dataLoaded: false,
    logo: proxy.$store.state.qsiteApp.logo,
    urlBase: proxy.$store.state.qsiteApp.baseUrl,
    currentStep: useStorage('tenant-step', 0),
    leftComponent: shallowRef(),
    rightComponent: shallowRef(),
    modules: [],
    themes: [],
    form: { title: null, selectedModules: [], selectedTheme: null },
  });

  // Computed
  const computeds = {
    progress: computed(() => {
      const progressPercent = 1 / steps.length;
      return progressPercent * state.currentStep;
    }),
  };

  // Methods
  const methods = {
    async init() {
      methods.setStep(state.currentStep);
      methods.getTenantConfigs();
    },
    //Set the step by index
    setStep(stepIndex) {
      const step = steps[stepIndex];
      if (step) {
        state.currentStep = stepIndex;
        state.leftComponent = step.leftComponent ?? shallowRef();
        state.rightComponent = step.rightComponent ?? shallowRef();
      }
    },
    //Go to next step
    nextStep() {
      methods.setStep(state.currentStep + 1);
    },
    //Go to previous step
    previousStep() {
      methods.setStep(state.currentStep - 1);
    },
    //Get the needed tenant configs
    getTenantConfigs(refresh = false) {
      service.getModulesTenantConfig(refresh).then(async (response) => {
        state.modules = response.client;
        state.themes = await service.getLayouts(
          response.baseTenantUrl,
          refresh
        );
        state.dataLoaded = true
      });
    },
  };

  // Mounted
  onMounted(() => {
    methods.init();
  });

  return { ...refs, ...toRefs(state), ...computeds, ...methods };
}
