<template>
  <div class="card-section" v-show="baixaSenha.ok">
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Baixa de senha realizada</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section class="q-pt-md">
        <p><strong>Data do atendimento: </strong> {{ baixaSenha.data }}</p>
        <p><strong>Consulente: </strong> {{ baixaSenha.consulente }}</p>
        <p><strong>Entidade: </strong> {{ baixaSenha.entidade }}</p>
        <p><strong>Senha: </strong>{{ baixaSenha.senha }}</p>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
    name: "BaixaSenha",
    props: {
        baixaSenha: {
            data: Date,
            consulente: String,
            entidade: String,
            senha: Number,
            ok: Boolean
        }
    }
};
</script>
<style scoped>
.my-card {
  width: 35%;
  margin: auto;
}
</style>