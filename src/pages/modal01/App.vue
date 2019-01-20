<template>
  <div>
    <button class="button is-primary" @click="showDialog">表示</button>

    <SandboxDialog ref="dlg"/>
  </div>
</template>


<script>
import SandboxDialog from './SandboxDialog.vue'

export default {
  components: {
    SandboxDialog
  },
  data() {
    return {}
  },
  methods: {
    async showDialog() {

      const result = await this.$xShowModal(this.$refs.dlg, { aa: 'bb' })

      console.log('result', result)
      this.$toast.open(`結果:${result.result}`)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
