<template>
  <transition :name="animation">
    <div class="modal is-active" v-if="shown">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head" v-if="header">
          <p class="modal-card-title">{{title}}</p>
        </header>
        <section class="modal-card-body">
          <slot/>
        </section>
        <footer class="modal-card-foot" style="justify-content:flex-end">
          <slot name="footer">
            <button class="button is-primary" @click="onOkDefault">OK</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import ModalDialogHelper from "./ModalDialogHelper";

export default {
  name: "ModalDialog",
  props: {
    header: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: null
    },
    animation: {
      type: String,
      default: "zoom-out"
    }
  },
  data() {
    return {
      shown: false,
      resolve: () => {},
      reject: () => {}
    };
  },
  created() {
    //表示時のイベント
    this.$on("show", ({ resolve, reject, payload }) => {
      this.shown = true;
      this.resolve = resolve;
      this.reject = reject;

      this.$nextTick().then(() => {
        let button = this.$el.querySelector("button");
        if (button !== null) {
          button.focus();
        }
        this.$emit("shown", payload);
      });
    });

    this.$on("close", result => {
      this.shown = false;

      this.$nextTick().then(() => {
        this.resolve(result);

        this.resolve = () => {};
        this.reject = () => {};
      });
    });
  },
  methods: {
    onOkDefault() {
      ModalDialogHelper.close(this, {});
    }
  }
};
</script>

<style lang="scss" scoped>
</style>