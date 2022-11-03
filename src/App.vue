<template>
  <Toolbar :title="title"/>
  <!-- :title="title" -->
  <router-view @changeTitle="changeTitle"></router-view>
</template>
<script >
import Toolbar from "./components/Toolbar.vue";
import Menu from "./views/Menu.vue";

export default {
  components: {
    Toolbar,
    Menu
  },

  data() {
    return {
      title: String
    }
  },

  mounted() {
    this.title = 'Menu Principal';
  },

  methods: {
    changeTitle(text) {
      this.title = text;
    }
  },
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
