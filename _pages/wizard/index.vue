<template>
  <div 
    id="tenant-wizard" 
    class="tw-h-screen overflow-auto row items-stretch"
  >
    <!--left component-->
    <div id="left" 
      v-if="currentStep?.left" 
      :class="currentStep?.left?.class"
      class="row items-baseline"      
    >
      <div 
        id="logo"
        class="flex justify-center tw-bg-white"
      >
        <a :href="urlBase">
          <img :src="logo" class="tw-h-20 tw-w-auto"/>
        </a>        
      </div>
        
      <component 
        :is="leftComponent"
        @previousStep="previousStep()"
        @nextStep="nextStep()" 
      />
    </div>
    <!--right component-->
    <div id="right" 
      v-if="currentStep?.right" 
      :class="currentStep?.right?.class"
      class="flex items-center"
    >    
      <component 
        :is="rightComponent"
        @previousStep="previousStep()"
        @nextStep="nextStep()"            
      />
    </div>
    <inner-loading :visible="loading"/>    
  </div>
</template>
<script>

import {defineComponent, }  from 'vue'
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
  }
})

</script>
<style lang="scss">  


#tenant-wizard {
  #logo {
    width: 100%; 
    height: 80px;
  }

  #left: {
    -webkit-animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    animation: fade-in-left 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  }

  #right {
    background-color: #fdfdfd;
  }
}


@-webkit-keyframes fade-in-left {
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

