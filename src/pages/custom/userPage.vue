<template>
<div>
  <div class="info-card">
    <img class="avetar" src="https://syouyu.oss-cn-shenzhen.aliyuncs.com/img-base/wechat-avetar.png" alt="" />
    <p class="user-name">黄镜明</p>
  </div>
  <div class="container">
    <h1 class="title">移动端点餐系统</h1>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">已完成</mt-tab-item>
      <mt-tab-item id="2">待完成</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="finished">
          <ul class="list">
            <li>✅ 菜品展示</li>
            <li>✅ 餐篮管理</li>
            <li>✅ 历史订单</li>
            <li>✅ 订单处理</li>
            <li>✅ 菜品管理</li>
          </ul>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="unfineshed">
          <ul class="list">
            <li>📌 微信登陆</li>
            <li>📌 微信支付</li>
            <li>报表展示</li>
            <li>菜品分类管理</li>
            <li>用户个人页面</li>
          </ul>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      selected: '1',
    }
  }
}
</script>

<style lang="scss" scoped>
.info-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #efefef;
  border-bottom: #ddd;

  .avetar {
    width: 3rem;
    height: 3rem;
    margin-top: 1rem;
    border: 1px #ddd solid;
    border-radius: 50%;
  }

  .user-name {
    margin: .5rem 0;
    color: #666;
    font-size: 1rem;
  }

}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    color: #666;
    font-size: .5rem;
    text-align: center;
  }
}

.list {
  margin-bottom: 2rem;

  li {
    margin: .5rem 0;
    font-size: .5rem;
  }
}
</style>


