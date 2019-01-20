<template>
  <ModalDialog title="モーダルダイアログ" @shown="onShown">
    テストテストテスト！{{payload.aa}}

    <button class="button is-info" @click="showNest">ネストダイアログを出す</button>
    <template slot="footer">
      <button class="button is-primary" @click="onOk">OK</button>
      <button class="button" @click="$xCloseModal({r:'abc'})">キャンセル</button>
    </template>

    <SandboxNestDialog ref="nestDlg"/>
  </ModalDialog>
</template>
<script>
import SandboxNestDialog from './SandboxNestDialog.vue'

export default {
  components: {
    SandboxNestDialog
  },
  data() {
    return {
      payload: {}
    }
  },
  methods: {
    onShown(payload) {
      this.payload = payload
    },
    onOk() {
      this.$xCloseModal({
        result: 'abc'
      })
    },
    showNest(){
      this.$xShowModal(this.$refs.nestDlg, {
        param: 'abcde',
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
