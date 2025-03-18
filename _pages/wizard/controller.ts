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
import { i18n } from 'src/plugins/utils';

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
    currentStep: useStorage('tenant-step', { index: 0, name: 'welcome' }),
    leftComponent: shallowRef(),
    rightComponent: shallowRef(),
    modules: [],
    themes: [],
    form: useStorage('tenant-form', { title: null, modules: [], layoutId: null })
  });

  // Computed
  const computeds = {
    progress: computed(() => {
      const progressPercent = 1 / steps.length;
      return progressPercent * (state.currentStep.index + 1);
    }),
    actions: computed(() => {
      let actions = {
        start: {
          method: methods.nextStep,
          props: {
            class: 'tw-animate-bounce',
            label: `${i18n.tr('isite.cms.label.start')} 🚀`,
          },
        },
        previous: {
          method: methods.previousStep,
          props: {
            label: i18n.tr('isite.cms.label.previous'),
            icon: 'fa-light fa-arrow-left',
            outline: true,
          },
        },
        next: {
          method: methods.nextStep,
          props: {
            label: i18n.tr('isite.cms.label.continue'),
            'icon-right': 'fa-light fa-arrow-right',
          },
        },
        create: {
          method: methods.createTenant,
          props: {
            class: 'tw-animate-bounce',
            label: `${i18n.tr('isite.cms.label.create')} 🚀`,
          },
        },
      };

      switch (state.currentStep.name) {
        case 'welcome':
          return [actions.start];
        case 'projectName':
          let nextProjectName = actions.next;
          nextProjectName.props.disable = (state.form.title ?? '').length < 3;
          return [actions.previous, nextProjectName];
        case 'modules':
          let nextModules = actions.next;
          nextModules.props.disable = !state.form.modules.length;
          return [actions.previous, nextModules];
        case 'themes':
          let nextTheme = actions.next;
          nextTheme.props.disable = !state.form.layoutId;
          return [actions.previous, nextTheme];
        case 'resume':
          return [actions.create];
        default:
          return [];
      }
    }),
  };

  // Methods
  const methods = {
    async init() {
      methods.setStep(state.currentStep.name);
      methods.getTenantConfigs();
    },
    //Set the step by index
    setStep(name) {
      const stepIndex = steps.findIndex(item => item.name == name);
      if (stepIndex >= 0) {
        const step = steps[stepIndex];
        state.currentStep = { index: stepIndex, name: step.name };
        state.leftComponent = step.leftComponent ?? shallowRef();
        state.rightComponent = step.rightComponent ?? shallowRef();
      }
    },
    //Go to next step
    nextStep() {
      methods.setStep(steps[state.currentStep.index + 1].name);
    },
    //Go to previous step
    previousStep() {
      methods.setStep(steps[state.currentStep.index - 1].name);
    },
    //Get the needed tenant configs
    getTenantConfigs(refresh = false) {
      service.getModulesTenantConfig(refresh).then(async (response) => {
        state.modules = response.client;
        state.themes = await service.getLayouts(
          response.baseTenantUrl,
          refresh
        );
        state.dataLoaded = true;
      });
    },
    //create Tenant
    createTenant() {
      console.warn(">>>> Create", state.form)
    },
  };

  // Mounted
  onMounted(() => {
    methods.init();
  });

  return { ...refs, ...toRefs(state), ...computeds, ...methods };
}
