<template>
<div class="container">

  <router-view></router-view>

  <mt-tabbar v-model="selected" fixed>
    <mt-tab-item id="tab1">
      <i slot="icon" class="iconfont icon-diancan"></i>
      点餐
    </mt-tab-item>
    <mt-tab-item id="tab2">
      <i slot="icon" class="iconfont icon-3lishi"></i>
      历史
    </mt-tab-item>
    <mt-tab-item id="tab3">
      <i slot="icon" class="iconfont icon-iconfuzhi"></i>
      我的
    </mt-tab-item>
  </mt-tabbar>

</div>
</template>

<script>

export default {
  data() {
    return {
      selected: 'tab1',
    }
  }
}
</script>

<style lang="scss" scoped>
.iconfont {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
