<script>
import InfoAir12 from './InfoAir12.vue';
import FormAir12 from './FormAir12.vue';

export default {
  components: {InfoAir12, FormAir12},
  
  data() {
      return {

    }
  },
  methods: {}
}
</script>

<template>
   <main class="main">
      <div class="info">
         <div>
            <InfoAir12 />
        </div>
      </div>
      <div class="form">
         <FormAir12 />
      </div>
   </main>
</template>

<style lang="scss" scoped>
 .main {
   overflow: hidden;
   display: flex;
   justify-content: center;
   min-height: 100vh;
   width: 100%;

  .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: var(--color-light-green);
      flex: 1;
      padding: 0px 7px;
   }
 }

  @media (min-width: 992px) {
  .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: var(--color-green);
      flex: 1;
      padding: 0px 7px;
   }
}

  @media (max-width: 991.98px) {
   main {
      flex-direction: column;
   }
     .info {
    display: none;
  }
}
</style>