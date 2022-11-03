<template>
  <q-toolbar class="bg-primary text-white">
    <q-toolbar-title> TEMS </q-toolbar-title>
    <q-toolbar-title>{{ title }}</q-toolbar-title>
    <q-btn rounded color="yellow" label="Menu" class="text-black" @click="navigate(menuTitle)" v-show="showMenuButton" />
    <q-btn flat round dense>
      <q-icon name="more_vert" />
    </q-btn>
  </q-toolbar>
</template>
<script>
export default {
  name: "Toolbar",
  emits: ["changeTitle"],
  data() {
    return {
      menuTitle: "Menu Principal",
      menuButton: false
    }
  },
  props: {
    title: String,
    showMenuButton: Boolean
  },

  methods: {
    navigate(text) {
      this.$router.push("/");
      this.$emit("changeTitle", text, !this.showMenuButton);
    },
  },
};
</script>

<style scoped>
.read-the-docs {
  color: #888;
}

.btn-route {
  text-decoration: none;
}
</style>
