<template>
  <div ref="container" tabindex="0" class="modal is-active loading-container" @keydown.prevent="onKeyDown">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="loading-mark" ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingComponent",
  props: {
    containerId: {
      type: String
    }
  },
  data() {
    return {};
  },
  beforeMount() {
    if (this.containerId !== undefined) {
      document.querySelector(this.containerId).appendChild(this.$el);
    } else {
      document.body.appendChild(this.$el);
    }
  },
  mounted() {
    //このローダーを出す前の時点でフォーカスを持っていたもの
    let previousActiveElement = document.activeElement;

    this.$refs.container.focus();

    this.$on("close", () => {
      this.$destroy();

      this.$nextTick().then(() => {
        this.$el.remove();
        if (previousActiveElement !== null) {
          previousActiveElement.focus();
        }
      });
    });
  },
  methods: {
    onKeyDown() {
      return false;
    }
  }
};
</script>
<style lang="scss" scoped>
.loading-container {
  cursor: progress;
  .modal-content {
    overflow: hidden;
    display: flex;
    justify-content: center;
  }
}
.loading-mark {
  animation: spinAround 600ms infinite linear;
  border: 5px solid #dbdbdb;
  border: {
    radius: 500px;
    right-color: transparent;
    bottom-color: transparent;
  }
  width: 100px;
  height: 100px;
}
</style>
