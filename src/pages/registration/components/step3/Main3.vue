<script setup>
  import Info3 from './Info3.vue';
  import Form3 from './Form3.vue';
</script>

<template>
   <main class="main">
      <div class="info">
         <div>
            <Info3 />
        </div>
      </div>
      <div class="form">
         <Form3 />
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
    display: none;
  }
}
</style>