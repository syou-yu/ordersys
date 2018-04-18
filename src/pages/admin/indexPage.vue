<template>
<div class="container">

  <h1>菜品管理</h1>
  <div class="goodsList">
    <div class="caption">
      <div class="caption__col" style="width: 30%">名称</div>
      <div class="caption__col" style="width: 20%">单价</div>
      <div class="caption__col" style="width: 30%">分类</div>
      <div class="caption__col" style="width: 20%">推荐</div>
    </div>
    <div
      class="goodsItem"
      v-for="(item,index) in goods"
      :key="index"
      @click="editGoods(item)"
    >
    <div style="width:30%">{{item.name}}</div>
    <div style="width:20%">{{item.price}}</div>
    <div style="width:30%">{{item.category}}</div>
    <div style="width:20%">{{item.hotsale?'是':'否'}}</div>
  </div>
  </div>


</div>
</template>

<script>
export default {
  data() {
    return {
      goods: null,
      activeGoods: null,
    }
  },
  mounted() {
    this.goods = JSON.parse(localStorage.getItem('goodsList'));
  },
  methods: {
    editGoods(goods) {
      this.activeGoods = goods;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.2rem;
  
  .goodsList {
    width: 100%;

    .caption {
      display: flex;
      align-items: center;
      text-align: center;
      font-size: 0.5rem;
      padding: 0.3rem 0;
      border-bottom: 1px solid #ddd;
    }

    .goodsItem {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
      text-align: center;
      font-size: 0.4rem;
      padding: 0.3rem 0;
    }
  }
}
</style>
