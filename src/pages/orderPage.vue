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
      <goods-list :goodsInfo="goodsList1" @cartList="getcartList"></goods-list>
    </mt-tab-container-item>
    <mt-tab-container-item id="2">
      <goods-list :goodsInfo="goodsList2" @cartList="getcartList"></goods-list>
    </mt-tab-container-item>
    <mt-tab-container-item id="3">
      <goods-list :goodsInfo="goodsList3" @cartList="getcartList"></goods-list>
    </mt-tab-container-item>
    <mt-tab-container-item id="4">
      <goods-list :goodsInfo="goodsList4" @cartList="getcartList"></goods-list>
    </mt-tab-container-item>
  </mt-tab-container>
  </transition>

  <!-- cart -->
  <mt-button 
    type="default" 
    class="cartBtn" 
    @click="toggleCart"
    :disabled="cartBtnDisabled">
    primary
  </mt-button>
  <mt-popup
    v-model="popupVisible"
    position="bottom"
    style="width: 100%;">
    <cart-list :cartInfo="cartList" @banBtn="controlBtn"></cart-list>
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
    getcartList(value) {
      this.cartList = value;
      this.cartBtnDisabled = false;
      console.log(this.cartList);
    },
    toggleCart() {
      this.popupVisible = !this.popupVisible;
    },
    controlBtn() {
      this.toggleCart();
      this.cartBtnDisabled = true;
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
