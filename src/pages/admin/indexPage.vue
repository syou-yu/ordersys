<template>
<div class="container">
  <div class="header">
    <h1>菜品管理</h1>
    <mt-button @click="showEditor">添加菜品</mt-button>
  </div>

  <div class="goodsList">
    <div class="caption">
      <div class="caption__col" style="width: 30%">名称</div>
      <div class="caption__col" style="width: 20%">单价</div>
      <div class="caption__col" style="width: 30%">分类</div>
      <div class="caption__col" style="width: 20%">推荐</div>
    </div>
    <div
      class="goodsItem"
      v-for="(item,index) in goods"
      :key="index"
      @click="editGoods(item)"
    >
      <div style="width:30%">{{item.name}}</div>
      <div style="width:20%">{{item.price}}</div>
      <div style="width:30%">{{item.category}}</div>
      <div style="width:20%">{{item.hotsale?'是':'否'}}</div>
    </div>
  </div>

  <!-- 弹窗 -->
  <model
    v-if="showModel"
    @close="closeEditor"
    maskPaddingLr="10"
  >
    <div class="editor" slot="content">
      <mt-button 
        type="danger" 
        style="width: 100%;"
        @click="delGoods"
        v-show="JSON.stringify(activeGoods) !== '{}'"
      >
        删除菜品
      </mt-button>

      <div class="form">
        <mt-field
          label="菜品名" 
          placeholder="请输入菜品名"
          v-model="activeGoods.name"
        >
        </mt-field>

        <mt-field
          label="菜品价格" 
          placeholder="请输入菜品价格"
          v-model="activeGoods.price"
          type="number"
        >
        </mt-field>

        <div @click="showCategoryPicker">
          <mt-field
            label="菜品分类" 
            placeholder="请选择菜品分类"
            v-model="activeGoods.category"
            :readonly="true"
          >
          </mt-field>
        </div>

        <mt-field label="是否推荐" :readonly="true">
          <mt-switch v-model="activeGoods.hotsale"></mt-switch>
        </mt-field>
      </div>
      
      <mt-button 
        type="primary" 
        style="width: 100%;"
        @click="submitEdit"
      >
        确认更改
      </mt-button>

    </div>
  </model>

  <!-- 分类选择器 -->
  <mt-popup
    class="categoryPicker"
    v-model="categoryPickerVisible"
    popup-transition="popup-fade"
    position="bottom"
  >
    <mt-picker :slots="categoryList" @change="onCategoryChange"></mt-picker>
  </mt-popup>

</div>
</template>

<script>
const localData = require('../../data/localData');
import model from '../../components/base/BaseModal';
import { Toast, MessageBox } from 'mint-ui';

export default {
  components: {
    model,
  },
  data() {
    return {
      goods: [],
      activeGoods: {},
      showModel: false,
      categoryPickerVisible: false,
      categoryList: [],
    }
  },
  mounted() {
    // 是否有本地储存？获取本地储存赋值商品列表：商品数据设置本地储存
    let localStorageGoods = JSON.parse(localStorage.getItem('goodsList'));
    if (localStorageGoods && localStorageGoods.length > 0) {
      this.goods = localStorageGoods;
    } else {
      this.goods = localData.postData;
    }
    // 设置categoryPicker的值
    let category  = this.goods.map((item) => {
      return item.category
    });
    let categoryPickerValues = Array.from(new Set(category))
    this.categoryList = [{
      flex: 1,
      values: categoryPickerValues,
    }];
  },
  methods: {
    editGoods(goods) {
      this.activeGoods = goods;
      this.showEditor();
      // console.log(this.activeGoods);
    },
    delGoods() {
      MessageBox.confirm(`确定删除${this.activeGoods.name}?`)
        .then((action) => {
          if (action === 'confirm') {
            // 查询在数组goods中位置
            let Index = this.goods.findIndex((item) => {
              return item.name === this.activeGoods.name
            });
            // 删除
            this.goods.splice(Index, 1);
            // 更改本地储存
            this.changeLocalStorage()
            // toast已删除信息
            let toastMessage = `${this.activeGoods.name} 已删除`
            Toast(toastMessage);
            // 关闭editor
            this.closeEditor();
          }
        })
        .catch((error) => {
          console.log(error);
        })
      ;
    },
    submitEdit() {
      let Index = this.goods.findIndex((item) => {
        return item.name === this.activeGoods.name
      });
      if (Index > -1) {
        this.goods[Index] = this.activeGoods;
        // 修改本地储存
        this.changeLocalStorage();
        // 提示
        let toastMessage = `${this.activeGoods.name} 修改成功`
        Toast(toastMessage);
      } else {
        let { name, price, category, hotsale } = this.activeGoods
        let newGoods = {
          name,
          price,
          category,
          hotsale
        };
        console.log(newGoods);
        this.goods.push(newGoods);

        // 修改本地储存
        localStorage.setItem('goodsList', JSON.stringify(this.goods));

        console.log(JSON.parse(localStorage.getItem('goodsList')));
        // 提示
        let toastMessage = `${this.activeGoods.name} 添加成功`
        Toast(toastMessage);
      }
      this.closeEditor();
    },
    changeLocalStorage() {
      localStorage.setItem('goodsList', JSON.stringify(this.goods));
    },
    showEditor() {
      this.showModel = true;
    },
    closeEditor() {
      this.showModel = false;
      this.activeGoods = {};
    },
    showCategoryPicker() {
      this.categoryPickerVisible = !this.categoryPickerVisible;
    },
    onCategoryChange(value) {
      let category = value.getValues()[0];
      this.activeGoods.category = category;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.2rem;

  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
  
  .goodsList {
    width: 100%;

    .caption {
      display: flex;
      align-items: center;
      text-align: center;
      font-size: 0.5rem;
      padding: .3rem 0;
      border-bottom: 1px solid #ddd;
    }

    .goodsItem {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
      text-align: center;
      font-size: 0.4rem;
      padding: .3rem 0;
    }
  }

  .editor {
    border-radius: 4px;

    .form {
      background: #fff;
    }
  }

  .categoryPicker {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}
</style>
