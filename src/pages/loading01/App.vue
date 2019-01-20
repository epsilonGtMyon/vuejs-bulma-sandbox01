<template>
  <div>
    <a class="button is-info" @click="showLoading">
      <span class="icon is-small">
        <i class="fas fa-bomb"></i>
      </span>
      <span>クルクル</span>
    </a>
  </div>
</template>

<script>
import Loading from "@/common/components/loading/Loading";

export default {
  methods: {
    async showLoading() {
      Loading.show();
      await this.timeout(3000);
      Loading.dismiss();

      this.$toast.open("くるくるおわり");
    },
    timeout(mills) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, mills);
      });
    }
  }
};
</script>

<style>
</style>
