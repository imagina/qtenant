import {computed, reactive, ref, onMounted, toRefs, watch, getCurrentInstance, useSlots, markRaw, shallowRef, defineAsyncComponent} from "vue";

//import services from "modules/qsite/_components/master/dynamicList/services";
import { store, i18n, clone, alert } from 'src/plugins/utils';
import components from 'modules/qsite/_components/master/dynamicList/components'

export default function controller (props: any, emit: any)
{
  const proxy = getCurrentInstance()!.appContext.config.globalProperties

  // Refs
  const refs = {
    // refKey: ref(defaultValue)
    //crudComponent: ref('crudComponent')
  }

  const steps = [
    {
      name: 'wellcome',
      left: {
        class: 'col-12 col-md-6',
        component: defineAsyncComponent(() => import('modules/qtenant/_components/wizard/steps/wellcome'))
      }
    },
    {
      name: 'wellcome2',
      right: {
        class: 'col-12',
        component: defineAsyncComponent(() => import('modules/qtenant/_components/wizard/steps/wellcome'))
      }
    }
  ]  

  // States
  const state = reactive({
    // Key: Default Value
    leftComponent: shallowRef(),
    rightComponent: shallowRef(),
    currentStep: {},
    
    loading: false,    
  })
  

  // Computed
  const computeds = {
    // key: computed(() => {})    
    
  }

  // Methods
  const methods = {
    // methodKey: () => {}    
    setStep(name){
      if(!name) return false 
      const step = steps.find(obj => obj.name === name)
      if(step){
        state.currentStep = step
        state.leftComponent  = step.left?.component || null
        state.rightComponent  = step.right?.component || null
      }
    },
    nextStep(){
      const step = methods.getNextStep()
      if(step) methods.setStep(step.name)
    },
    getNextStep(){
      const currentIndex = steps.findIndex(obj => obj.name === state.currentStep.name);
      
      // Return the next object, if it exists; otherwise, return null
      if (currentIndex !== -1 && currentIndex < steps.length - 1) {
        console.log(steps[currentIndex + 1])
        return steps[currentIndex + 1];
      }
      return false
    },
    getComponent(component){
      return markRaw(component)      
    },
    async init ()
    { 
      methods.setStep('wellcome')
    }, 
  }
    
  // Mounted
  onMounted(() =>
  {
    methods.init()
  })

  // Watch
  // watch(key, (newField, oldField): void => {
  //
  // }, {deep: true})

  return {...refs, ...(toRefs(state)), ...computeds, ...methods}
}
