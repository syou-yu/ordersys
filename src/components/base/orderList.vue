<template>
<div>
  <div class="list">
    <div class="list__item" v-for="(item,index) in listInfo" :key="index">
      <div class="list__item--goodsName">{{item.goodsName}}</div>
      <div class="list__item--goodsPrice">
        <i class="iconfont icon-renminbi"></i>
        {{item.goodsPrice}}
      </div>
      <div class="list__item--goodsQuantity">{{item.quantity}}</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props:["listInfo"],
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  &__item {
    display: flex;
    align-items: baseline;
    width: 100%;

    &--goodsName {
      width: 40%;
      text-align: center;
      font-size: 0.4rem;
      text-align: center;
    }

    &--goodsPrice {
      width: 30%;
      text-align: center;
      font-size: 0.4rem;
    }

    &--goodsQuantity {
      width: 30%;
      text-align: center;
    }
  }
}
</style>

