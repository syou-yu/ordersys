<style lang="scss" scoped>
.historyList {
  padding: 0 0.5rem;
}
.item {
  margin: 0.5rem 0;
  background: #efefef;

  &__header {
    border-bottom: 1px rgba(255,255,255,.5) solid;
  }
}
</style>

<template>
<div>
  <!-- 导航栏 -->
  <mt-header :title="headerTitle"></mt-header>

  <!-- 历史订单列表 -->
  <div class="historyList">
    <div class="item" v-for="(item,index) in historyList" :key="index">
      <div class="item__header">header{{item.orderDate}}</div>
      <base-list :listInfo="item.orderList" style="margin: 0.2rem 0;"></base-list>
      <div class="item__footer">footer</div>
    </div>
  </div>

</div>
</template>

<script>
import baseList from '../components/base/list'
export default {
  components: {
    baseList
  },
  data() {
    return {
      headerTitle: '历史订单',
      historyList: [],
    }
  },
  mounted() {
    this.historyList = JSON.parse( localStorage.getItem('historyOrder') );
  },
}
</script>
