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
    //crudComponent: ref('crudComponent'),
    child: ref(null),
  };

  const steps = [
    {
      name: 'wellcome',
      left: {
        component: defineAsyncComponent(
          () => import('modules/qtenant/_components/wizard/steps/wellcome')
        ),
      },
    },
    {
      name: 'terms',
      left: {
        component: defineAsyncComponent(
          () => import('modules/qtenant/_components/wizard/steps/terms/left')
        ),
      },
      right: {
        component: defineAsyncComponent(
          () => import('modules/qtenant/_components/wizard/steps/terms/right')
        ),
      },
    },
    {
      name: 'company',
      left: {
        component: defineAsyncComponent(
          () => import('modules/qtenant/_components/wizard/steps/company/left')
        ),
      },
      right: {
        component: defineAsyncComponent(
          () => import('modules/qtenant/_components/wizard/steps/company/right')
        ),
      },
    },
    // {
    //   name: 'terms3',
    //   left: {
    //     component: defineAsyncComponent(
    //       () => import('modules/qtenant/_components/wizard/steps/terms/left')
    //     ),
    //   },
    //   right: {
    //     component: defineAsyncComponent(
    //       () => import('modules/qtenant/_components/wizard/steps/terms/right')
    //     ),
    //   },
    // },
  ];

  // States
  const state = reactive({
    // Key: Default Value
    leftComponent: shallowRef(),
    rightComponent: shallowRef(),
    currentStep: {},
    systemName: 'qtenant.wizard',
    loading: false,
    isActiveButtonNext: true,
  });

  // Computed
  const computeds = {
    // key: computed(() => {})
    progress: computed(() => {
      const progressPercent = 1 / (steps.length - 1);
      return progressPercent * methods.getCurrentIndex();
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
    async setStep(name) {
      if (!name) return false;
      const step = steps.find((obj) => obj.name === name);
      if (step) {
        state.loading = true;
        state.currentStep = step;
        const cacheStep = await methods.getCache(step.name);
        if (cacheStep === null) methods.setCache(step.name, {});
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
    getCurrentIndex() {
      return steps.findIndex((obj) => obj.name === state.currentStep.name) || 0;
    },
    getPreviousStep() {
      const currentIndex = methods.getCurrentIndex();
      // Return the next object, if it exists; otherwise, return null
      if (currentIndex !== -1) {
        return steps[currentIndex - 1];
      }
      return false;
    },
    getNextStep() {
      const currentIndex = methods.getCurrentIndex();
      state.isActiveButtonNext = true;
      // Return the next object, if it exists; otherwise, return null
      if (currentIndex !== -1 && currentIndex < steps.length - 1) {
        return steps[currentIndex + 1];
      }
      return false;
    },
    onActiveNextStep(activate) {
      state.isActiveButtonNext = activate;
    },

    getComponent(component) {
      return markRaw(component);
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
