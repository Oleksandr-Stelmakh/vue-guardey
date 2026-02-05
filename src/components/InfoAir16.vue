<script setup>

</script>

<template>
   <div class="info__container">
      <div class="info__img">
         <img src="./icons/Tell.svg" alt="img">
		</div>
	</div>
</template>

<style lang="scss" scoped>
    .info {

   &__container {
      display: flex;
      flex-direction: column;
      gap: 50px;
      padding: 0px 10px;
      gap: calc(10px + (50 - 10) * (100vw - 320px) / (1280 - 320));
   }

   &__title {
      max-width: 569px;
      font-weight: 400;
      font-size: 30px;
      line-height: 1.2;
      letter-spacing: -1px;
      text-align: center;
      color: var(--color-fff);
      font-size: calc(20px + (30 - 20) * ((100vw - 360px) / (1280 - 360)));
      padding: 0px 0px 8px 0px;
   }

   &__img {
      display: flex;
      justify-content: center;
   }
}

.info__img img {
   max-width: 100%;
   object-fit: cover;
}
</style>