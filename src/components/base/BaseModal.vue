<template>

  <transition name="modal-fade">
    <div class="modal-mask" @click="close" :style="modal_style">
      <div class="modal" @click.stop>

        <!-- 内容的slot -->
        <div class="modal-content"> 
          <slot name="content">
            <h2>模态框的内容</h2>
            style:{{modal_style}}
          </slot> 
        </div> 
        
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'Modal',
  props: {
    maskPaddingLr: {
      type: String,
      default: '0'
    },
    maskOpacity: {
      type: Number,
      default: 0.3
    }
  },
  data() {
    return {
    };
  },
  computed: {
    modal_style() {
      return {
        padding: `0 ${this.Torem(this.maskPaddingLr)}`,
        backgroundColor: `rgba(0, 0, 0, ${this.maskOpacity})`,
      };
    }
  },
  created() {
    // 解决因passive导致preventDefault被忽略的问题
    window.addEventListener('touchmove', this.handleScroll, { passive: false });
  },
  methods: {
    Torem(px) {
      return px / 10 / 2 * 1 + 'rem';
    },
    close() {
      this.$emit('close');
      window.removeEventListener('touchmove', this.handleScroll);
    },
    // 解决穿透
    handleScroll(e) {
      e.preventDefault();
    }
  }
};
</script>
<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.modal {
  width: 100%;
  overflow-x: auto;
  text-align: center;
}

/* modal-fade */
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
/* end modal-fade */
</style>

