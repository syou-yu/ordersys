<template>
<div class="container">
  
  <mt-button class="btn" type="primary" @click="toOrder">
    <p class="btn__tableNum">{{$route.params.id}}号餐桌</p>
    <p>立即点餐</p>
  </mt-button>
  
</div>
</template>

<script>
export default {
  methods: {
    toOrder() {
      this.$router.push({ path: '/table'+this.$route.params.id +'/index/order'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  font-size: 0.6rem;
  box-shadow: 2px 2px 5px #888888;

  &__tableNum {
    font-size: 1rem;
  }
}
</style>
