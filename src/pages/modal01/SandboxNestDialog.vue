<template>
  <ModalDialog title="ネストダイアログ" @shown="onShown">
    ネストしたダイアログ:{{param}}
  </ModalDialog>
</template>

<script>

export default {
  data(){
    return {
      param:''
    }
  },

  methods: {
    onShown(payload) {
      this.param = payload.param
    },
  }
}
</script>

