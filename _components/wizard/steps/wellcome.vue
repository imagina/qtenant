<template>
    <div id="step-welcome">
      <div class="row col-12 justify-center">
        <div>
          <h2 class="text-primary">{{step.title}}</h2>
        </div>
        
        <div v-html="step.description" class="text-center">
        </div>
        <q-img 
          v-if="step?.mediaFiles"   
          fit="contain"
          :src="step?.mediaFiles?.mainimage.extraLargeThumb"
          :ratio="1/1" class="tw-h-44"
        />
        <q-btn  
          rounded
          class="tw-text-center"
          no-caps
          color="primary"
          size="md"
          outline
          @click="nextStep()"
        >
          {{ $tr('isite.cms.label.start') }}
        </q-btn>
      </div>
    </div>
  </template>
  <script>  
  
  export default {
    components: {},
    emits: ['nextStep'],
    data() {
      return {
        step: {
          title: 'title...', 
            description: 'Aquí podras crear tu sitio de manera sencilla y eficiente. te guiaremos en cada paso para que puedas expresar tu visión en línea. ¡Comencemos a crear tu sitio! 🚀'
          }
      }
    },
    mounted() {
      this.$nextTick(async function () {
        
      })
    },
    methods: {      
      nextStep() {
        try {
          this.$emit("nextStep");
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  </script>
  <style scope>
  #step-welcome {
    width: 100%;
  }

  </style>
  