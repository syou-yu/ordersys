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
          日期：{{ FormatDate(item.orderDate) }}
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
  methods: {
    FormatDate (strTime) {
      let date = new Date(strTime);
      let Year = date.getFullYear();
      let Month = date.getMonth()+1 > 10 ? date.getMonth()+1 : '0'+(date.getMonth()+1);
      let Day = date.getDate() > 10 ? date.getDate() : ('0'+date.getDate());
      let Hour = date.getHours() > 10 ? date.getHours() : '0'+date.getHours();
      let Minute = date.getMinutes() > 10 ? date.getMinutes() : '0'+date.getMinutes();
      let Second = date.getSeconds() > 10 ? date.getSeconds() : '0'+date.getSeconds();
      return `${Year}/${Month}/${Day} ${Hour}:${Minute}:${Second}`;
    }
  }
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
