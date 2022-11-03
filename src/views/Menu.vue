<template>
  <div class="q-pa-md row content-start q-gutter-md">
    <q-card
      bordered
      class="my-card col-3 q-pa-sm"
      v-for="item in menu.items"
      v-bind:key="item.title"
      @click="navigate(item.route, item.desc)"
    >
      <q-card-title>
        <q-icon large left :name="item.icon" size="sm"/>
        <span class="title font-weight-light">{{ item.title }}</span>
      </q-card-title>
      <q-card-text class="headline font-weight-bold">
        <blockquote>{{ item.desc }}</blockquote>
      </q-card-text>
    </q-card>
  </div>
</template>
<script>
export default {
  name: "Menu",
  emits: ['changeTitle'],
  methods: {
    navigate(route, title) {
      this.$router.push(route);
      this.$emit('changeTitle', title, this.showMenuButton);
    }
  },
  data() {
    return {
      menu: {
        items: [
          {
            icon: "person",
            title: "Senha",
            desc: "Emissão de Senha",
            route: "recepcao",
          },

          {
            icon: "assignment",
            title: "Baixa Senha",
            desc: "Baixa de Senha",
            route: "baixa",
          },
        ],
      },
      showMenuButton: true
    };
  },
};
</script>
<style scoped>

.my-card{
  cursor: pointer;
}

</style>