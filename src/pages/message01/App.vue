<template>
  <div>
    <button class="button is-info" @click="confirmYesNo">確認</button>
    <button class="button is-success" @click="success">情報</button>
    <button class="button is-warning" @click="warning">警告</button>
    <button class="button is-danger" @click="danger">エラー</button>
  </div>
</template>

<script>
import MessageDialog from '@/common/components/messagedialog/MessageDialog'

export default {
  methods:{
    async confirmYesNo(){
      const result = await MessageDialog.confirmYesNo("●●●●●しますか？")
      if(result){
        this.$toast.open("はいが押された")
      }else{
        this.$toast.open({
          message: 'いいえが押された',
          type:'is-danger'
        })
      }
    },

    success(){
      MessageDialog.success("●●●●●しました")

    },

    warning(){
      MessageDialog.warning("●●●●●です")

    },

    danger(){
      MessageDialog.danger("エラーーです。")

    },
  }
}
</script>

<style>

</style>
