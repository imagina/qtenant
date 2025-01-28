<template>
  <div>
    <p>TENANT</p>
  </div>
</template>
<script>
export default {
  beforeUnmount() {},
  computed: {
    steps() {
     return {}
    },
    siteName() {
      return ''
    },    
  },
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    this.$nextTick(async function () {
      this.init();
    })
  },
  methods: {
    async init() {     
    }
  }
}
</script>
<style>
</style>
