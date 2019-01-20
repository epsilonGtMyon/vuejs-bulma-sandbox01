import Vue from 'vue'
import MessageDialogComponent from './MessageDialogComponent.vue'

class MessageDialog {
  static show({ containerId, title, titleStyle, icon, iconStyle, message, buttons }) {
    let MessageDialogComponentVue = Vue.extend(MessageDialogComponent)
    return new Promise((resolve, reject) => {
      let propsData = {
        containerId,
        title,
        titleStyle,
        icon,
        iconStyle,
        message,
        buttons,
        resolve
      }

      new MessageDialogComponentVue({
        propsData,
        el: document.createElement('div')
      })
    })
  }

  static confirmYesNo(message) {
    return MessageDialog.show({
      title: '確認',
      titleStyle: 'is-info',
      icon: 'fa-question-circle',
      iconStyle: 'has-text-info',
      message,
      buttons: [
        { text: 'はい', class: 'is-info' },
        { text: 'いいえ', class: 'is-info' }
      ]
    }).then(idx => {
      return Promise.resolve(idx === 0)
    })
  }

  static success(message) {
    return MessageDialog.show({
      title: '情報',
      titleStyle: 'is-success',
      icon: 'fa-info-circle',
      iconStyle: 'has-text-success',
      message,
      buttons: [{ text: 'OK', class: 'is-success' }]
    })
  }

  static warning(message) {
    return MessageDialog.show({
      title: '警告',
      titleStyle: 'is-warning',
      icon: 'fa-exclamation-triangle',
      iconStyle: 'has-text-warning',
      message,
      buttons: [{ text: 'OK', class: 'is-warning' }]
    })
  }

  static danger(message) {
    return MessageDialog.show({
      title: 'エラー',
      titleStyle: 'is-danger',
      icon: 'fa-ban',
      iconStyle: 'has-text-danger',
      message,
      buttons: [{ text: 'OK', class: 'is-danger' }]
    })
  }

}

export default MessageDialog
