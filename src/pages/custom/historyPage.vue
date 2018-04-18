<template>
  <div>
    <!-- 导航栏 -->
    <mt-header :title="headerTitle"></mt-header>

    <!-- 历史订单列表 -->
    <history-order-list
      :historyOrderInfo="historyList"
      style="padding: 0 0.5rem; margin-bottom: 4rem;"
     >
    </history-order-list>

  </div>
</template>

<script>
import historyOrderList from '../../components/custom/historyOrderList';

export default {
  components: {
    historyOrderList,
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
