<template>
  <div>
    <div class="cartList">

      <div class="caption">
        <div class="caption__col" style="width: 40%">商品名称</div>
        <div class="caption__col" style="width: 30%">商品单价</div>
        <div class="caption__col" style="width: 30%">商品数量</div>
      </div>

      <div class="cartItem"
        v-for="(item,index) in cartInfo"
        :key="index">

        <p class="goodsName">{{item.goodsName}}</p>

        <p class="goodsPrice">
          <i class="iconfont icon-renminbi"></i>
          {{item.goodsPrice}}
        </p>

        <div class="goodsQuantity">
          <mt-button size="small" class="numBtn" @click="minus(item,index)">
            <i slot="icon" class="iconfont icon-minus"></i>
          </mt-button>
            {{item.quantity}}
          <mt-button size="small" class="numBtn" @click="add(item)">
            <i slot="icon" class="iconfont icon-add"></i>
          </mt-button>
        </div>

      </div>

      <div class="sum">
        合计：
        <span>
          <i class="iconfont icon-renminbi"></i>
          {{sum()}}
        </span>
      </div>

      <div class="submitBtn">
        <mt-button style="width: 100%;" @click="addToHistoryOrder">submit</mt-button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props:['cartInfo'],
  data() {
    return {
      localStorageArray: []
    }
  },
  methods: {
    add(item) {
      item.quantity++;
      return
    },
    minus(item,index) {
      let that = this;
      item.quantity--;
      if (item.quantity === 0) {
        that.cartInfo.splice(index,1);
      };
      if ( that.cartInfo.length === 0){
        that.$emit('banBtn');
      }

      return
    },
    sum() {
      if (this.cartInfo.length > 0) {
        let priceArray = this.cartInfo.map((item) => {
          return item.goodsPrice * item.quantity
        });
        let sumPrice = priceArray.reduce((prev,cur) => {
          return prev + cur
        })

      return sumPrice
      }
    },
    addToHistoryOrder() {
      let localStorageObject = {
        orderList: this.cartInfo,
        totalPrice: this.sum(),
        orderDate: new Date(),
        orderStatus: '进行中',
        tableNumber: this.$route.params.id,
      };
      let oldLocalStorageArray = JSON.parse(localStorage.getItem('historyOrder'));
      // 如果本地储存已存在
        if (oldLocalStorageArray && oldLocalStorageArray.length > 0) {
          this.localStorageArray = oldLocalStorageArray;
          this.localStorageArray.push(localStorageObject);
          localStorage.setItem('historyOrder', JSON.stringify(this.localStorageArray));
          console.log('had localStorage')
        } else {
          console.log('empty localStorage')
          this.localStorageArray.push(localStorageObject);
          localStorage.setItem('historyOrder', JSON.stringify(this.localStorageArray));
        }

      this.$emit('hadSubmit');
    }
  },
  mounted() {
    // console.log(this.cartInfo)
  }

}
</script>

<style lang="scss" scoped>
.cartList {
  padding: 0 0.3rem;
  margin: 0.5rem 0; 
}
.caption {
  display: flex;
  color: #333333;
  font-size: 0.5rem;
  line-height: 1rem;
  text-align: center;
  border-bottom: 1px #efefef solid;
}
.cartItem {
  display: flex;
  align-items: center;
  height: 100%;
}
.goodsName {
  width: 40%;
  color: #333333;
  font-size: 0.4rem;
  text-align: center;
}
.goodsPrice {
  width: 30%;
  color: #F56C6C;
  font-size: 0.4rem;
  text-align: center;
}
.goodsQuantity {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
}
.numBtn {
  display: flex;
  justify-content: center;
  align-items: baseline;
  width: 0.5rem ;
  height: 0.8rem ;
  font-size: 0.5rem;
  margin: 0 0.2rem;
}
.sum {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 0.5rem;
  color: #333333;
  line-height: 1rem;
  border-top: 1px #efefef solid;
}
</style>