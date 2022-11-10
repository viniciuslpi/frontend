<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md" style="width: 50%;margin: auto;">

      <q-select behavior="menu" outlined v-model="input.entidade" use-input hide-selected fill-input
        input-debounce="200" :options="options" @filter="filterFn" @update:model-value="updateFn"
        hint="Minimum 3 characters to trigger filtering" style="width: 100%; padding-bottom: 32px" label="Entidade">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-input v-model="input.numAtendimento" label="Número do atendimento" outlined style="width: 100%;"
        hint="Minimum 3 characters to trigger filtering" />
      <q-btn type="submit" btn_size_rd_md color="primary" size="md" label="SALVAR" />
    </q-form>
  </div>
</template>
<script>

import { ref, onMounted } from "vue";
import axios from "axios";

export default {

  name: "Baixa",
  setup() {
    const options = ref(stringOptions);
    const input = ref({
      numAtendimento: ref(null),
      entidade: ref(null)
    })
    // const inputNumAtendimento = ref(null);
    // const inputEntidade = ref(null);
    var stringOptions = [];

    onMounted(async () => {
      try {
        const response = await axios.get(`/api/recepcao/v1/entidades`);
        const arrayEntidades = response.data.rows;
        arrayEntidades.map(item => stringOptions.push(item))
      } catch (err) {
        console.log(err);
      }
    })

    return {
      input,
      options,

      updateFn(val) {
        if (val && typeof val === "object") {
          // console.log(val)
          input.value.entidade = val.label
        }
      },

      filterFn(val, update, abort) {
        if (val.length < 3) {
          abort()
          return
        }

        update(async () => {
          const needle = val.toLowerCase()
          options.value = stringOptions.filter(v => v.nome.toLowerCase().indexOf(needle) > -1);
          console.log(options.value)
        })

      },

      async onSubmit() {

        const formData = {
          entidade: input.value.entidade,
          atendimento: input.value.numAtendimento
        }

        // if (formData.entidade == null || formData.atendimento == null) {
        //   console.log(">>> Os campos precisam estar preenchidos");
        // } else {


        try {
          let resp = await axios.get(`/api/recepcao/v1/atendimentos/${formData.atendimento}`);


          if (resp.data) {
            if (resp.status === 200) {
              let atendimento = resp.data;
              // console.log(atendimento);
              let pessoa = await axios.get(`/api/recepcao/v1/pessoas/${atendimento.pessoa_id}`);
              console.log(pessoa);
              if (atendimento.entidade_id) {
                console.log("Atendimento já baixado", "");
              } else {
                if (!formData.atendimento || formData.atendimento <= 0) {
                  console.log(
                    "Id inválido",
                    "Favor entrar em contato com o suporte"
                  );
                } else {
                  // let atendimentoUpdate = await axios.put(`/api/recepcao/v1/atendimentos/${formData.atendimento}`, { entidade_id: this.fields.entidade });

                  // if (atendimentoUpdate.status != 204) {
                  //   console.error("ERRO NA GRAVAÇÃO");
                  //   console.log(
                  //     "Erro na gravação dos dados!",
                  //     "Favor entrar em contato com o suporte"
                  //   );
                  // } else {
                  //   this.fields.id = "";
                  //   this.ok.show = true;
                  //   this.ok.data = moment(atendimento.data).format("DD/MM/YYYY");
                  //   this.ok.nome = pessoa.data.nome;
                  //   this.ok.senha = atendimento.senha;


                  console.log("teste");

                  // this.okMessage = `Atendimento realizado em <b>${moment(atendimento.data).format('DD/MM/YYYY')}</b> para ${pessoa.data.nome}, número de Senha: ${atendimento.senha}`;

                  // this.setTimeoutMessage();
                }
              }
            }
          }
        } catch (err) {
          if (err.response) {
            if (err.response.status === 404) {
              console.log("Atendimento não encontrado", "");
            }
          }
        }

        // console.log(">>> Baixa de Senha Realizada");
        // console.log(formData);
        // input.value.numAtendimento = null
        // }
      }

    }
  }
}


</script>
