<template>
  <Toolbar
    :title="title"
    :showMenuButton="showMenuButton"
    @changeTitle="changeTitle"
  />
  <router-view @changeTitle="changeTitle"></router-view>
</template>
<script >
import Toolbar from "./components/Toolbar.vue";
import Menu from "./views/Menu.vue";

export default {
  components: {
    Toolbar,
    Menu,
  },

  data() {
    return {
      title: "Menu Principal",
      route: String,
      showMenuButton: false,
    };
  },

  methods: {
    changeTitle(text) {
      this.showMenuButton = !this.showMenuButton;
      this.title = text;
    },
  },
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
