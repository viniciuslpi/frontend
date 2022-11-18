<template>
  <div class="q-pa-md">
    <q-form
      @submit="onSubmit"
      class="formulario"
      style="width: 35%; margin: auto"
    >
      <q-select
        behavior="menu"
        outlined
        v-model="input.entidade"
        option-label="nome"
        option-value="id"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFn"
        @update:model-value="updateFn"
        hint="Minimum 3 characters to trigger filtering"
        style="width: 100%; padding-bottom: 35px"
        label="Entidade"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Nenhum resultado foi encontrado
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-input
        v-model="input.numAtendimento"
        label="Número do atendimento"
        outlined
        style="width: 100%; padding-bottom: 35px"
        hint="Minimum 3 characters to trigger filtering"
      />
      <q-btn
        type="submit"
        btn_size_rd_md
        color="primary"
        size="md"
        label="SALVAR"
      />
    </q-form>

    <!-- `Atendimento realizado em <b>${moment(atendimento.data).format('DD/MM/YYYY')}</b> para ${pessoa.data.nome}, número de Senha: ${atendimento.senha}`; -->

    <div class="card-section" v-show="baixaSenha.ok">
      <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6">Baixa de senha realizada</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p><strong>Data do atendimento: </strong> {{ baixaSenha.data }}</p>
          <p><strong>Consulente: </strong> {{ baixaSenha.consulente }}</p>
          <p><strong>Entidade: </strong> {{ baixaSenha.entidade }}</p>
          <p><strong>Senha: </strong>{{ baixaSenha.senha }}</p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "Baixa",
  setup() {
    var stringOptions = [];
    var entidadeData = {};
    const options = ref(stringOptions);

    const input = ref({
      numAtendimento: ref(null),
      entidade: ref(null),
    });

    const baixaSenha = ref({
      data: ref(null),
      consulente: ref(null),
      entidade: ref(null),
      senha: ref(null),
      ok: ref(null),
    });

    onMounted(async () => {
      try {
        const response = await axios.get(`/api/recepcao/v1/entidades`);
        stringOptions = response.data.rows;
        options.value = stringOptions;
      } catch (err) {
        console.log(err);
      }
    });

    return {
      input,
      options,
      baixaSenha,

      updateFn(val) {
        if (val && typeof val === "object") {
          input.value.entidade = val.nome;
          entidadeData = val;
        }
      },

      filterFn(val, update, abort) {
        // if (val.length < 3) {
        //   abort();
        //   return;
        // }

        setTimeout(() => {
          update(async () => {
            input.value.entidade = val.nome;
            const needle = val.toLowerCase();
            options.value = stringOptions.filter(
              (v) => v.nome.toLowerCase().indexOf(needle) > -1
            );
          });
        }, 1000);
      },

      async onSubmit() {
        const formData = {
          entidade: input.value.entidade,
          atendimento: input.value.numAtendimento,
        };
        if (
          !formData.atendimento ||
          formData.atendimento <= 0 ||
          isNaN(formData.atendimento)
        ) {
          console.log("Código inválido. Favor entrar em contato com o suporte");
        } else {
          try {
            let resp = await axios.get(
              `/api/recepcao/v1/atendimentos/${formData.atendimento}`
            );

            if (resp.data && resp.status === 200) {
              let atendimento = resp.data;
              if (atendimento.entidade_id) {
                console.log("Atendimento já obteve baixa");
              } else {
                let atendimentoUpdate = await axios.put(
                  `/api/recepcao/v1/atendimentos/${formData.atendimento}`,
                  { entidade_id: entidadeData.id }
                );

                if (atendimentoUpdate.status != 204) {
                  console.error("ERRO NA GRAVAÇÃO");
                  console.log(
                    "Erro na gravação dos dados! Favor entrar em contato com o suporte"
                  );
                } else {
                  input.value.numAtendimento = null;
                  console.log("Baixa de senha realizada");

                  try {
                    let pessoa = await axios.get(
                      `/api/recepcao/v1/pessoas/${atendimento.pessoa_id}`
                    );

                    if (pessoa.data) {
                      baixaSenha.value.data = moment(atendimento.data).format("DD/MM/YYYY");
                      baixaSenha.value.consulente = pessoa.data.nome
                      baixaSenha.value.entidade = formData.entidade
                      baixaSenha.value.senha = atendimento.senha_id
                      baixaSenha.value.ok = true;
                    } else {
                      console.log("Consulente não encontrado");
                    }
                  } catch (err) {
                    console.log(err);
                  }
                }
              }
            }
          } catch (err) {
            if (err.response && err.response.status === 404) {
              console.log("Atendimento não encontrado");
            }
          }
        }
      },
    };
  },
};
</script>
<style scoped>
.my-card {
  width: 35%;
  /* max-width: 250px; */
  margin: auto;
}

.formulario {
  padding-bottom: 50px;
  padding-top: 50px;
}
</style>