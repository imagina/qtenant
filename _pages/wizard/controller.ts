import {
  computed,
  reactive,
  ref,
  onMounted,
  toRefs,
  watch,
  getCurrentInstance,
  useSlots,
  markRaw,
  shallowRef,
  defineAsyncComponent,
} from 'vue';
import { cache } from 'src/plugins/utils';

export default function controller(props: any, emit: any) {
  const proxy = getCurrentInstance()!.appContext.config.globalProperties;

  // Refs
  const refs = {
    // refKey: ref(defaultValue)
  };

  const steps = [
    {
      name: 'wellcome',
      left: {
        component: defineAsyncComponent(
          () => import('modules/qtenant/_pages/wizard/views/welcome.vue')
        ),
      },
    },
    {
      name: 'projectName',
      left: {
        component: defineAsyncComponent(
          () => import('modules/qtenant/_pages/wizard/views/projectName.vue')
        ),
      }
    },
    {
      name: 'modules',
      left: {
        component: defineAsyncComponent(
          () => import('modules/qtenant/_pages/wizard/views/modules.vue')
        ),
      }
    },
    {
      name: 'themes',
      left: {
        component: defineAsyncComponent(
          () => import('modules/qtenant/_pages/wizard/views/themes.vue')
        ),
      }
    },
  ];

  // States
  const state = reactive({
    loading: false,
    leftComponent: shallowRef(),
    rightComponent: shallowRef(),
    form: {title: null, selectedModules : [], selectedTheme: null},
    currentStep: {},
    systemName: 'qtenant.wizard',
    logo: proxy.$store.state.qsiteApp.logo,
    urlBase: proxy.$store.state.qsiteApp.baseUrl,
  });

  // Computed
  const computeds = {
    isMobile: computed(() => {
      return proxy.$q.screen.lt.md;
    }),
    currentStepIndex: computed(() => {
      if(!state.currentStep.name) return 0
      return steps.findIndex((obj) => obj.name === state.currentStep.name);
    }),
    progress: computed(() => {
      const progressPercent = 1 / steps.length;
      return progressPercent * (computeds.currentStepIndex.value);
    }),
  };

  // Methods
  const methods = {
    // methodKey: () => {}
    async setCache(key, data) {
      let cacheData = await cache.get.item(state.systemName);
      if (!cacheData) cacheData = {};
      cacheData[key] = data;
      await cache.set(state.systemName, cacheData);
    },
    async getCache(key) {
      const data = await cache.get.item(state.systemName);
      if (data && data[key]) return data[key];
      return null;
    },
    removeCache() {
      //this.$cache.remove('org-wizard-data');
    },
    setStep(name) {
      if (!name) return false;
      const step = steps.find((obj) => obj.name === name);
      if (step) {
        state.loading = true;
        state.currentStep = step;
        methods.setCache('step', step.name);
        state.leftComponent = step.left?.component || null;
        state.rightComponent = step.right?.component || null;
        state.loading = false;
      }
    },
    nextStep() {
      const step = methods.getNextStep();
      if (step) methods.setStep(step.name);
    },
    previousStep() {
      const step = methods.getPreviousStep();
      if (step) methods.setStep(step.name);
    },
    getPreviousStep() {
      const currentIndex = computeds.currentStepIndex.value;
      // Return the next object, if it exists; otherwise, return null
      if (currentIndex !== -1) {
        return steps[currentIndex - 1];
      }
      return false;
    },

    getNextStep() {
      const currentIndex = computeds.currentStepIndex.value;
      // Return the next object, if it exists; otherwise, return null
      if (currentIndex !== -1 && currentIndex < steps.length - 1) {
        return steps[currentIndex + 1];
      }
      return false;
    },
    async init() {
      //restore last step
      const step = (await methods.getCache('step')) || steps[0].name;
      methods.setStep(step);
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
