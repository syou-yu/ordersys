<style lang="scss" scoped>

</style>

<template>
  <div>
    <!-- header -->
    <mt-header :title="headerTitle"></mt-header>

    <!-- nav tab -->
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">进行中</mt-tab-item>
      <mt-tab-item id="2">已完成</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <!-- content (进行中)-->
      <mt-tab-container-item id="1">
        <kitchenOrderList :orderListInfo="isOrding"></kitchenOrderList>
      </mt-tab-container-item>

      <!-- content (已完成) -->
      <mt-tab-container-item id="2">
        <kitchenOrderList :orderListInfo="hadCompleted"></kitchenOrderList>
      </mt-tab-container-item>

    </mt-tab-container>

    <button @click="clearLocalStorage">clear up localStorage</button>


  </div>
</template>

<script>
import kitchenOrderList from '../../components/kitchen/kitchenOrderList';

export default {
  components: {
    kitchenOrderList,
  },
  data() {
    return {
      headerTitle: '厨房订单处理',
      orderList: [],
      selected: "1",
    }
  },
  computed: {
    isOrding() {
      if(this.orderList) {
        return this.orderList.filter((item) => {
          return item.orderStatus === '进行中'
        })
      }
      return
    },
    hadCompleted() {
      if(this.orderList) {
        return this.orderList.filter((item) => {
          return item.orderStatus === '已完成'
        })
      }
      return
    }
  },
  mounted() {
    let historyOrderArray = localStorage.getItem('historyOrder');
    this.orderList = JSON.parse(historyOrderArray);
  },
  methods: {
    clearLocalStorage() {
      localStorage.removeItem('historyOrder');
      console.log(`had remove localStorage ‘historyOrder’`)
    }
  }
}
</script>


