<template>
  <div 
    id="tenant-wizard" 
    class="tw-h-screen overflow-auto row items-stretch"
  >
    <!--left component-->
    <div id="left" 
      v-if="currentStep?.left" 
      class="row"
      :class="currentStep.right ? 'col-12 col-md-6' : 'col-12'"
    >
      <div 
        id="logo"
        class="flex justify-center tw-bg-white"
      >
        <a :href="urlBase">
          <img :src="logo" class="tw-h-20 tw-w-auto"/>
        </a>        
      </div>
      <Transition name="fade" mode="out-in">
        <component
          class="left-component"
          :is="leftComponent"
          @previousStep="previousStep()"
          @nextStep="nextStep()" 
        />
      </Transition>
      
      
      <div
        id="stepper"
        :class="isMobile ? 'tw-w-full' : 'tw-w-1/2'"        
      >
        <q-linear-progress          
          size="sm"
          color="primary"
          :track-color="progress ? 'blue-grey-1' : 'white'"
          :value="progress"
        />
        <div class="row justify-between">
          <div class="col-4 q-pa-md">
            <q-btn
              rounded
              no-caps
              :disabled="false"
              unelevated
              color="blue-grey"
              icon="fa-light fa-arrow-left"
              @click="previousStep()"
              :label="isMobile ? '' : $tr('isite.cms.label.previous')"
              v-if="progress"
            />
          </div>
          <div class="col-4 q-pa-md text-right">
            <q-btn
              rounded
              no-caps
              :disabled="false"
              icon-right="fa-light fa-arrow-right tw-ml-0 sm:tw-ml-2"
              @click="nextStep()"
              unelevated
              color="green"
              :label="isMobile ? '' : $tr('isite.cms.label.continue')"
              v-if="progress"
            />
          </div>
        </div>        
      </div>
    </div>
    <!--right component-->
    <div id="right"
      v-if="currentStep?.right"       
      class="row col-6 gt-sm items-center"
    >
      <component 
        class="right-component"
        :is="rightComponent"
        @previousStep="previousStep()"
        @nextStep="nextStep()"            
      />
    </div>
    <inner-loading :visible="loading"/>    
  </div>
</template>
<script>

import {defineComponent, Transition }  from 'vue'
import controller from 'modules/qtenant/_pages/wizard/controller'

export default defineComponent({  
  data() {
    return {
      loading: false,      
      logo: this.$store.state.qsiteApp.logo,      
      urlBase: this.$store.state.qsiteApp.baseUrl
    }
  },  
  setup(props, {emit}) {
    return controller(props, emit)
  }, 
  computed: {
    isMobile(){
      return this.$q.screen.lt.md
    }
  }
})

</script>
<style lang="scss">  

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#tenant-wizard {
  #logo {
    width: 100%; 
    height: 80px;
  }

  #stepper {
    bottom: 0;
    left: 0;
    position: fixed;
  }

  .right-component {
    -webkit-animation: fade-in-left 0.6s ease both;
    animation: fade-in-left 0.6s ease both;
  }

  #right {
    background-color: #fdfdfd;
  }
}



@keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
    transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}


</style>

