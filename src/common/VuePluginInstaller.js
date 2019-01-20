import ModalDialogHelper from './components/modaldialog/ModalDialogHelper'

const VuePluginInstaller = {
  install(Vue, options) {
    //---------------
    // modal-dialog
    Vue.prototype.$xShowModal = function(vm, payload) {
      return ModalDialogHelper.show(vm, payload)
    }

    Vue.prototype.$xCloseModal = function(result) {
      ModalDialogHelper.close(this, result)
    }
  }
}
export default VuePluginInstaller
