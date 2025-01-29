<template>
  <div id="tenant-wizard" class="row">
    <div id="logo" class="col-12">
      <div class="row">
        <div class="col-12 col-md-6" style="background-color: aquamarine;">logo title</div>
      </div>      
    </div>
    <div id="left" v-if="currentStep?.left" :class="currentStep?.left?.class">
      <component 
        :is="leftComponent"
        @nextStep="nextStep()"            
      />
    </div>
    <div id="right" v-if="currentStep?.right" :class="currentStep?.right?.class">
      <component 
        :is="rightComponent"
        @nextStep="nextStep()"            
      />
      hello
    </div>
  </div>
</template>
<script>

import {defineComponent, }  from 'vue'
import controller from 'modules/qtenant/_pages/wizard/controller'

export default defineComponent({    
  setup(props, {emit}) {
    return controller(props, emit)
  }
})

</script>
<style lang="scss">  


#tenant-wizard {
  #logo {    
    background-color: red;    
  }
  #left {    
    background-color: blue;
  }
  #right {    
    background-color: yellow;
  }
}
</style>

