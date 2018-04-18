<template>
  <div class="container">
    <div
      :class="{ item: true, hadCompleted: item.orderStatus === '已完成'}"
      v-for="(item,index) in orderListInfo"
      :key="index"
      @click="showMessageBox(item)"
     >
      <!-- header -->
      <div class="item__header">
        <div class="item__header-top">
          日期：{{ item.orderDate }}
        </div>
        <div class="item__header-bottom">
          餐桌号： {{ item.tableNumber }}
          <span>状态：{{ item.orderStatus }}</span>
        </div>
      </div>

      <!-- list -->
      <list class="item__list" :listInfo="item.orderList"></list>

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
import list from '../base/orderList';

export default {
  props:["orderListInfo"],
  components: {
    list,
  },
  methods: {
    showMessageBox(item) {
      let HistoryOrderList = JSON.parse(localStorage.getItem('historyOrder'));
      if(item.orderStatus === '进行中') {
        this.$confirm('提示', '确定完成订单？').then(action => {
          if(action === 'confirm') {
            item.orderStatus = '已完成';
            let index = HistoryOrderList.findIndex((n) => {
              return n.orderDate === item.orderDate
            });
            HistoryOrderList.splice(index,1,item);
            localStorage.setItem('historyOrder', JSON.stringify(HistoryOrderList));
          }
        }).catch(err => {
          console.log(err);
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
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

  &__header-bottom {
    display: flex;
    justify-content: space-between;
  }

  &__list {
    margin: 0.1rem 0;
  }

  &__footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px rgba(255,255,255,.5) solid;
    font-size: 0.5rem;
  }
}
.hadCompleted {
  background: rgba(0,0,0,.2);
}
</style>

