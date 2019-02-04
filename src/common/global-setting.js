import Vue from 'vue'
import Buefy from 'buefy'
import VuePluginInstaller from './VuePluginInstaller'

Vue.use(Buefy, {
  defaultIconPack: 'fas'
})
Vue.use(VuePluginInstaller)

//components
import { ModalDialog } from './components'

Vue.component(ModalDialog.name, ModalDialog)
