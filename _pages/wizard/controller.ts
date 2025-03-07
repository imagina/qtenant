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
    {
      name: 'resume',
      left: {
        component: defineAsyncComponent(
          () => import('modules/qtenant/_pages/wizard/views/resume.vue')
        ),
      }
    },
    {
      name: 'creation',
      left: {
        component: defineAsyncComponent(
          () => import('modules/qtenant/_pages/wizard/views/creation.vue')
        ),
      }
    },
  ];

  // States
  const state = reactive({
    loading: false,
    systemName: 'qtenant.wizard',
    logo: proxy.$store.state.qsiteApp.logo,
    urlBase: proxy.$store.state.qsiteApp.baseUrl,
    leftComponent: shallowRef(),
    rightComponent: shallowRef(),
    form: {title: null, selectedModules : [], selectedTheme: null},
    currentStep: {},
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
    ],
    themes: [
      { name: "modern", title: "Modern Style", image: "https://images.pexels.com/photos/3184450/pexels-photo-3184450.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
      { name: "classic", title: "Classic Look", image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
      { name: "minimalist", title: "Minimalist Design", image: "https://images.pexels.com/photos/7060816/pexels-photo-7060816.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
      { name: "dark", title: "Dark Mode", image: "https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
      { name: "colorful", title: "Colorful Theme", image: "https://images.pexels.com/photos/2876787/pexels-photo-2876787.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
      { name: "elegant", title: "Elegant Feel", image: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
      { name: "business", title: "Business Theme", image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
      { name: "portfolio", title: "Portfolio Showcase", image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
      { name: "tech", title: "Tech & Innovation", image: "https://images.pexels.com/photos/11813138/pexels-photo-11813138.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" },
      { name: "creative", title: "Creative Agency", image: "https://images.pexels.com/photos/3768883/pexels-photo-3768883.jpeg?auto=compress&cs=tinysrgb&w=300&h=500" }
    ]
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
