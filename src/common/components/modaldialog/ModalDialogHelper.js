import ModalDialog from './ModalDialog.vue'

/**
 * モーダルダイアログを検索します。
 */
function _findModalDialog(vm) {
  if (vm.$options['name'] === ModalDialog.name) {
    return vm
  }

  for (let child of vm.$children) {
    let modalDialogComponent = _findModalDialog(child)
    if (modalDialogComponent !== null) {
      return modalDialogComponent
    }
  }
  return null
}

class ModalDialogHelper {
  /**
   * ダイアログを表示します。
   * @param {*} vm
   * @param {*} payload
   */
  static show(vm, payload) {
    let modalDialog = _findModalDialog(vm)
    if (modalDialog === null) {
      throw new Error('not found ModalDialog')
    }

    return new Promise((resolve, reject) => {
      modalDialog.$emit('show', {
        resolve,
        reject,
        payload
      })
    })
  }

  static close(vm, result) {
    let modalDialog = _findModalDialog(vm)
    if (modalDialog === null) {
      throw new Error('not found ModalDialog')
    }
    modalDialog.$emit('close', result)
  }
}

export default ModalDialogHelper
