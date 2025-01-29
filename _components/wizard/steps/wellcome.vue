<template>
    <div class="step-welcome">
      <div class="row justify-center align-center">
        <div class="col-12 col-sm-10 col-md-11">
          <div class="tw-mx-auto lg:tw-w-3/5 tw-mt-4">
            <h2 class="step-title-1 text-primary">{{step.title}}</h2>
            <div class="tw-text-xs md:tw-text-xl lg:tw-px-8 tw-text-center tw-pb-4 md:tw-pb-6"
                v-html="step.description">
            </div>
            <q-img v-if="step?.mediaFiles" fit="contain"
                  :src="step?.mediaFiles?.mainimage.extraLargeThumb"
                  :ratio="1/1" class="tw-h-44"
            />
            <div class="text-center tw-mt-6">
              <q-btn  rounded
                      class="tw-text-center"
                      no-caps
                      color="primary"
                      size="md"
                      outline
                      @click="nextStep()">
                {{ $tr('isite.cms.label.start') }}
              </q-btn>
            </div>
          </div>
        </div>
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
  .page-full .q-stepper__content  {
    width: 100% !important;
    min-height: 100vh !important;
    display: contents;
    background: -webkit-linear-gradient(right, #fff, #e4e2f2);
    justify-content: center;
    align-items: center;
    padding-top: 5rem !important;
  }
  </style>
  