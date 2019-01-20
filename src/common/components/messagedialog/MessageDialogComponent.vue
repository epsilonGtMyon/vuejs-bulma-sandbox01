<template>
  <transition :name="animation">
    <div class="modal is-active" v-if="shown">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head" :class="titleStyle">
          <p class="modal-card-title">{{title}}</p>
        </header>

        <section class="modal-card-body media">
          <div class="media-left">
            <span class="icon is-large" :class="iconStyle">
              <i class="fa-3x fas" :class="icon"></i>
            </span>
          </div>
          <div class="media-content">
            <span v-for="mes in linedMessage" :key="mes">
              {{mes}}
              <br>
            </span>
          </div>
        </section>

        <footer class="modal-card-foot" style="justify-content:flex-end">
          <button
            v-for="(btn, index) in buttons"
            class="button"
            :class="btn.class"
            :key="btn.text"
            @click="buttonClicked(index)"
          >{{btn.text}}</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MessageDialogComponent",
  props: {
    containerId: {
      type: String
    },
    title: {
      type: String
    },
    titleStyle: {
      type: String
    },
    icon: {
      type: String
    },
    iconStyle:{
      type: String
    },
    message: {
      type: String
    },
    buttons: {
      type: Array
    },
    resolve: {
      type: Function
    },
    animation: {
      type: String,
      default: "zoom-out"
    }
  },
  data() {
    return {
      shown: false
    };
  },
  beforeMount() {
    if (this.containerId !== undefined) {
      document.querySelector(this.containerId).appendChild(this.$el);
    } else {
      document.body.appendChild(this.$el);
    }
  },
  mounted() {
    this.shown = true;
    this.$nextTick().then(() => {
      let button = this.$el.querySelector("button");
      if (button !== null) {
        button.focus();
      }
    });
  },
  methods: {
    buttonClicked(index) {
      this.shown = false;
      this.$nextTick().then(() => {
        this.$destroy();

        this.$nextTick().then(() => {
          this.$el.remove();
          this.resolve(index);
        });
      });
    }
  },
  computed: {
    linedMessage() {
      return this.message.split("\n");
    }
  }
};
</script>
