<template>
<div style="margin-bottom: 100px;">
  {{clearInfo}}
  <div class="itemGroup" v-for="(item,index) in goodsInfo" :key="index">
    <div class="item">
      <div class="img"></div>
      <div class="detail">
        <div class="title">{{item.name}}</div>
        <div class="ditailBottom">
          <div class="price"><i class="iconfont icon-renminbi"></i>{{item.price}}</div>
          <mt-button 
            class="btn"
            type="primary"
            size="small"
            @click="addToCart(item)">
            加入餐篮
          </mt-button>
        </div>
      </div>
  </div>
  </div>
</div>
</template>

<script>
export default {
  props: ["goodsInfo", "clearInfo"],
  data() {
    return {
      cartList: [],
    };
  },
  methods: {
    addToCart(item) {
      // 查找餐篮中是否已存在商品
      let hasGoods = this.cartList.some((goods)=>{
        return( goods.goodsName === item.name)
      })
      // 判断新增或数量加一
      if(hasGoods){
        let theGoods = this.cartList.filter((goods)=>{
          return (goods.goodsName === item.name)
        })
        theGoods[0].quantity++
      } else {
        let cartItem = {
          'goodsName': item.name,
          'goodsPrice': item.price,
          'quantity': 1
        };
        this.cartList.push(cartItem);
      };
      this.$emit('cartList', this.cartList)
      console.log(this.cartList);
    }
  },
};
</script>

<style lang="scss" scoped>
.itemGroup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.3rem;
}
.item {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.detail {
  flex: 1;
  margin-left: 0.6rem;
}
.ditailBottom {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.2rem;
}
.img {
  width: 2rem;
  height: 2rem;
  background: black;
}
.title {
  color: #333333;
  font-size: 0.6rem;
  margin-top: 0.1rem;
}
.price {
  color: #F56C6C;
  font-size: 0.6rem;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
