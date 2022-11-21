<template>
  <div class="q-pa-xl">
    <div class="row nomes">
      <div class="col-6">
        <q-select
          outlined
          v-model="model"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          :options="options"
          option-label="nome"
          @filter="filterFn"
          @update:model-value="updateFn"
          @new-value="addFn"
          @input-value="inputFn"
          hint="Minimum 3 characters to trigger filtering"
          style="width: 100%; padding-bottom: 32px"
          label="Nome"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="col">
        <q-select outlined v-model="model" :options="options" label="Gênero" />
      </div>
      <div class="col">
        <q-input
          outlined
          v-model="text"
          label="Nascimento: dd/mm/aaaa (calendario)"
        />
      </div>
    </div>
    <div class="row email">
      <div class="col">
        <q-input outlined v-model="text" label="E-mail" />
      </div>
      <div class="col">
        <q-input outlined v-model="text" label="Observação" />
      </div>
    </div>
    <div class="row titulos">
      <div class="col-8">
        <h3 class="text-h6" style="font-weight: bold">Endereço</h3>
      </div>
      <div class="col">
        <h3 class="text-h6" style="font-weight: bold">Documentos</h3>
      </div>
    </div>
    <div class="row endereco">
      <div class="row col-8">
        <div class="col-2">
          <q-input outlined v-model="text" label="CEP" />
        </div>
        <div class="col">
          <q-input outlined v-model="text" label="Logradouro" />
        </div>
      </div>
      <div class="col-1">
        <q-input outlined v-model="text" label="Número" type="number" />
      </div>
      <div class="col">
        <q-input outlined v-model="text" label="Complemento" />
      </div>
    </div>
    <div class="row endereco-2">
      <div class="row col-8">
        <div class="col">
          <q-input outlined v-model="text" label="Bairro" />
        </div>
        <div class="col">
          <q-input outlined v-model="text" label="Cidade" />
        </div>
      </div>
      <div class="col">
        <q-input outlined v-model="text" label="Estado" type="number" />
      </div>
      <div class="col">
        <q-input outlined v-model="text" label="País" />
      </div>
    </div>
    <div class="row titulo">
      <h3 class="text-h6" style="font-weight: bold">Telefones</h3>
    </div>
    <div class="row contato">
      <div class="row col-8 telefones">
        <div class="col">
          <q-input outlined v-model="text" label="Residencial" />
        </div>
        <div class="col">
          <q-input outlined v-model="text" label="Comercial" />
        </div>
        <div class="col">
          <q-input outlined v-model="text" label="Celular" />
        </div>
      </div>
      <div class="col">
        <q-input outlined v-model="text" label="CPF" />
      </div>
      <div class="col-1">
        <q-input outlined v-model="text" label="RG" />
      </div>
    </div>
    <div class="row contato-2">
      <div class="col">
        <q-btn
          color="primary"
          label="NOVO CADASTRO"
          style="margin-right: 10px"
        />
        <q-btn
          color="primary"
          label="ALTERAR CADASTRO"
          style="margin-right: 10px"
          disabled
        />
        <q-btn
          color="primary"
          label="CANCELAR"
          style="margin-right: 10px"
          disabled
        />
        <q-btn color="primary" label="SALVAR" disabled />
      </div>
    </div>
    <div class="row titulo">
      <h3 class="text-h6" style="font-weight: bold">Atendimento</h3>
    </div>
    <div class="row atendimento">
      <div class="col-2">
        <q-select outlined v-model="model" :options="options" label="Período" />
      </div>
      <div class="col">
        <q-btn
          color="primary"
          label="NOVO ATENDIMENTO"
          style="margin-right: 10px"
        />
        <q-btn
          color="primary"
          label="CANCELAR"
          style="margin-right: 10px"
          disabled
        />
        <q-btn
          color="primary"
          label="SALVAR"
          style="margin-right: 10px"
          disabled
        />
        <q-btn color="primary" label="IMPRIMIR" disabled />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Recepcao",
  setup() {
    const options = ref(stringOptions);
    const codigo = ref("");
    const text = ref("");
    var stringOptions = [];

    return {
      model: ref(null),
      options,
      codigo,
      text,

      inputFn(val) {
        // console.log(val)
      },

      addFn(val) {
        // console.log(val)
      },

      updateFn(val) {
        if (val && typeof val === "object") {
          // console.log(val)
          codigo.value = val.nome;
        }
      },

      filterFn(val, update, abort) {
        // codigo para tratamento da inserção de dado (novo cadastro)
        /*if (true) {
          update(() => {
            options.value = [];
          })
          return
        }*/

        if (val.length < 3) {
          abort();
          return;
        }

        update(async () => {
          stringOptions = await axios.get(
            `/api/recepcao/v1/pessoas/nome/${val}`
          );
          const needle = val.toLowerCase();
          options.value = stringOptions.data.filter(
            (v) => v.nome.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>
<style scoped>
div[class*="col"] {
  /* border: solid 1px red; */
  margin: 5px;
}

.col-8 {
  margin: 0 !important;
}

.row {
  /* margin-bottom: 10px; */
}
</style>
