<template>
<div class="container">
  <!-- 导航栏 -->
  <mt-header :title="headerTitle">
    <router-link :to="tableNum" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
    <!-- <div slot="right">23232</div> -->
  </mt-header>



  <!-- tab -->
  <mt-navbar v-model="selected">
    <mt-tab-item id="1">热销推荐</mt-tab-item>
    <mt-tab-item id="2">凉粉系列</mt-tab-item>
    <mt-tab-item id="3">雪山系列</mt-tab-item>
    <mt-tab-item id="4">糕点系列</mt-tab-item>
  </mt-navbar>

  <!-- tab-container -->
  <transition name="fade">
  <mt-tab-container v-model="selected">
    <mt-tab-container-item id="1">
      <goods-list
        :goodsInfo="goodsList1"
        @goodsItem="getcartList">
      </goods-list>
    </mt-tab-container-item>
    <mt-tab-container-item id="2">
      <goods-list
        :goodsInfo="goodsList2"
        @goodsItem="getcartList">
     </goods-list>
    </mt-tab-container-item>
    <mt-tab-container-item id="3">
      <goods-list
        :goodsInfo="goodsList3"
        @goodsItem="getcartList">
      </goods-list>
    </mt-tab-container-item>
    <mt-tab-container-item id="4">
      <goods-list
        :goodsInfo="goodsList4"
        @goodsItem="getcartList">
      </goods-list>
    </mt-tab-container-item>
  </mt-tab-container>
  </transition>

  <!-- cart -->
  <mt-button 
    type="default" 
    class="cartBtn" 
    @click="toggleCart"
    :disabled="cartBtnDisabled">
    <mt-badge size="small" v-if="cartList.length !== 0">{{cartList.length}}</mt-badge>
  </mt-button>
  <mt-popup
    v-model="popupVisible"
    position="bottom"
    style="width: 100%;">
    <cart-list
      :cartInfo="cartList"
      @banBtn="controlBtn"
      @hadSubmit="clearList">
    </cart-list>
  </mt-popup>

</div>
</template>

<script>
let localData = require('../data/localData')
import goodsList from '../components/goodsList'
import cartList from '../components/cartList'

export default {
  components: {
    goodsList,
    cartList
  },
  data() {
    return {
      tableNum: `/table${this.$route.params.id}`,
      headerTitle: `${this.$route.params.id}号餐桌点餐中`,
      selected: '1',
      goodsList: [],
      cartList: [],
      cartBtnDisabled: true,
      popupVisible: false,
      clearCartList: false,
    }
  },
  computed: {
    goodsList1() {
      return this.goodsList.filter((item)=>{
        return item.hotsale === true
      })
    },
    goodsList2() {
      return this.goodsList.filter((item)=>{
        return item.category === '凉粉系列'
      })
    },
    goodsList3() {
      return this.goodsList.filter((item)=>{
        return item.category === '雪山系列'
      })
    },
    goodsList4() {
      return this.goodsList.filter((item)=>{
        return item.category === '糕点系列'
      })
    }

  },
  mounted(){
    this.goodsList = localData.postData;
  },
  methods: {
    // 控制cartList
    getcartList(value) {
      // 查找餐篮中是否已存在商品
      let hasGoods = this.cartList.some((goods) => {
        return( goods.goodsName === value.name)
      });
      // 判断新增或数量加一
      if (hasGoods) {
        let theGoods = this.cartList.filter((goods) => {
          return (goods.goodsName === value.name)
        })
        theGoods[0].quantity++
      } else {
        let cartItem = {
          'goodsName': value.name,
          'goodsPrice': value.price,
          'quantity': 1,
        };
        this.cartList.push(cartItem);
      }

      if (this.cartList.length === 0) {
        this.controlBtn();
      } else {
        this.cartBtnDisabled = false;
      }
    },
    // 弹出popup页内容
    toggleCart() {
      this.popupVisible = !this.popupVisible;
    },
    // 禁用餐篮按钮
    controlBtn() {
      this.toggleCart();
      this.cartBtnDisabled = true;
    },
    clearList() {
      this.cartList = [];
      this.controlBtn();
    }

  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.cartBtn {
  position: fixed;
  bottom: 55px;
  width: 100%;
}
</style>
