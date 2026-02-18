<script setup>
  import InfoAir1 from './InfoAir1.vue';
  import FormAir1 from './FormAir1.vue';
</script>

<template>
   <main class="main">
      <div class="info">
         <div>
            <InfoAir1 />
        </div>
      </div>
      <div class="form">
         <FormAir1 />
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

  .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: var(--color-green);
   }

  .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: var(--color-light-green);
      padding-top: 20px;
   }
 }

 @media (min-width: 992px) {
  .info,
  .form {
    flex: 1;
  }
  .main{
    padding-top: 72px;
  }
}

 @media (max-width: 991.98px) {
   .main {
      flex-direction: column;
      padding-top: 52px;
   }
     .info {
    flex: 0;
    padding: 0px 7px;
  }
   .form {
    min-height: 100vh;
  }
}
</style>