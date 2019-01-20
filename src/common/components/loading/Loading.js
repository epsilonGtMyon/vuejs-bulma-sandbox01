import Vue from 'vue'
import LoadingComponent from './LoadingComponent.vue'

let LoadingComponentVue = Vue.extend(LoadingComponent)
let stackCount = 0;
let current = null

class Loading {

 static show(){
  stackCount++
  if(current !== null){
    //既に出ている。
    return
  }
  current = new LoadingComponentVue({
    el: document.createElement('div')
  })
 }
  
 static dismiss(){
  stackCount--
  if(stackCount > 0){
    //まだ出ている
    return;
  }
  if(current === null){
    return
  }
  current.$emit('close')
  current = null;
 }

}

export default Loading