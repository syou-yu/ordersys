<template>
  <div>
    <div
      :class="{ item: true, hadCompleted: item.orderStatus === '已完成'}"
      v-for="(item,index) in historyOrderInfo"
      :key="index"
     >
      <!-- header -->
      <div class="item__header">
        <div class="item__header-top">
          日期：{{ item.orderDate }}
        </div>
        <div class="item__header-bottom">
          状态：{{ item.orderStatus }}
        </div>
      </div>

      <!-- list -->
      <list :listInfo="item.orderList" style="margin: 0.2rem 0;"></list>

      <!-- footer -->
      <div class="item__footer">
        总计：
        <span>
          <i class="iconfont icon-renminbi"></i>
          {{item.totalPrice}}
        </span>
      </div>

    </div>
  </div>
</template>

<script>
import List from '../base/orderList'

export default {
  props: ["historyOrderInfo"],
  components: {
    List,
  },
}
</script>

<style lang="scss" scoped>
.historyList {
  padding: 0 0.5rem;
}
.item {
  margin: 0.5rem 0;
  background: #efefef;

  &__header {
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
    border-bottom: 1px rgba(255,255,255,.5) solid;
  }

  &__header-top {
    display: flex;
    justify-content: space-between;
  }

  &__footer {
    display: flex;
    justify-content: space-around;
  }
}
.hadCompleted {
  background: rgba(0,0,0,.2);
}
</style>
