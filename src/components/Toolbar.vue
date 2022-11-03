<template>
    <q-toolbar class="bg-primary text-white">
      <!-- <q-btn flat round dense>
        <q-icon name="menu" />
      </q-btn> -->
      <q-toolbar-title> TEMS </q-toolbar-title>
      <q-toolbar-title>{{ title }}</q-toolbar-title>
      <q-btn rounded color="yellow" label="Menu" class="text-black"/>
      <q-btn flat round dense>
        <q-icon name="more_vert" />
      </q-btn>
    </q-toolbar>
</template>
<script>
export default {
  name: "Toolbar",
  emits: ['changeTitle'],

  props: {
    title: String
  }
};
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
