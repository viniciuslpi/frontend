<template>
  <div class="q-pa-xl" style="width: 80%; margin: auto">
    <div class="row nomes">
      <div class="col-6">
        <q-select
          outlined
          v-model="form.nome"
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
          <template v-if="form.nome" v-slot:append>
            <q-icon
              name="cancel"
              @click.stop.prevent="reset"
              class="cursor-pointer"
            />
          </template>
        </q-select>
      </div>
      <div class="col">
        <q-select
          outlined
          v-model="form.genero"
          :options="options || ['Masculino', 'Feminino']"
          label="Gênero"
        />
      </div>
      <div class="col">
        <q-input
          outlined
          v-model="form.data"
          label="Nascimento: dd/mm/aaaa (calendario)"
        />
      </div>
    </div>
    <div class="row email">
      <div class="col">
        <q-input outlined v-model="form.email" label="E-mail" />
      </div>
      <div class="col">
        <q-input outlined v-model="form.observacao" label="Observação" />
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
          <q-input outlined v-model="form.cep" label="CEP"/>
        </div>
        <div class="col">
          <q-input filled v-model="form.logradouro" label="Logradouro" disable/>
        </div>
      </div>
      <div class="col-1">
        <q-input outlined v-model="form.numero" label="Número" type="number" />
      </div>
      <div class="col">
        <q-input outlined v-model="form.complemento" label="Complemento" />
      </div>
    </div>
    <div class="row endereco-2">
      <div class="row col-8">
        <div class="col">
          <q-input outlined v-model="form.bairro" label="Bairro" />
        </div>
        <div class="col">
          <q-input outlined v-model="form.cidade" label="Cidade" />
        </div>
      </div>
      <div class="col">
        <q-input outlined v-model="form.estado" label="Estado" />
      </div>
      <div class="col">
        <q-input outlined v-model="form.pais" label="País" />
      </div>
    </div>
    <div class="row titulo">
      <h3 class="text-h6" style="font-weight: bold">Telefones</h3>
    </div>
    <div class="row contato">
      <div class="row col-8 telefones">
        <div class="col">
          <q-input outlined v-model="form.residencial" label="Residencial" />
        </div>
        <div class="col">
          <q-input outlined v-model="form.comercial" label="Comercial" />
        </div>
        <div class="col">
          <q-input outlined v-model="form.celular" label="Celular" />
        </div>
      </div>
      <div class="col">
        <q-input outlined v-model="form.cpf" label="CPF" />
      </div>
      <div class="col-2">
        <q-input outlined v-model="form.rg" label="RG" />
      </div>
    </div>
    <div class="row botoes" style="margin: 10px 0 20px 0">
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
import axios from "axios";

export default {
  name: "Recepcao",
  setup() {
    const options = ref(stringOptions);
    const codigo = ref("");
    const text = ref("");
    var stringOptions = [];

    const form = ref({
      nome: ref(""),
      genero: ref(""),
      data: ref(null),
      email: ref(""),
      observacao: ref(""),
      cep: ref(""),
      logradouro: ref(""),
      numero: ref(""),
      complemento: ref(""),
      bairro: ref(""),
      cidade: ref(""),
      estado: ref(""),
      pais: ref(""),
      residencial: ref(""),
      comercial: ref(""),
      celular: ref(""),
      cpf: ref(""),
      rg: ref(""),
    });

    return {
      model: ref(null),
      options,
      codigo,
      text,
      form,

      inputFn(val) {
        // console.log(val)
      },

      addFn(val) {
        // console.log(val)
      },

      updateFn(val) {
        if (val && typeof val === "object") {
          atualizarFormulario(form, val);
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
          // console.log(stringOptions);
          const needle = val.toLowerCase();
          options.value = stringOptions.data.filter(
            (v) => v.nome.toLowerCase().indexOf(needle) > -1
          );
        });
      },

      reset() {
        limparFormulario(form);
      },
    };
  },
};

export function limparFormulario(form) {
  form.value.nome = null;
  form.value.genero = null;
  form.value.data = null;
  form.value.email = null;
  form.value.observacao = null;
  form.value.cep = null;
  form.value.logradouro = null;
  form.value.numero = null;
  form.value.complemento = null;
  form.value.bairro = null;
  form.value.cidade = null;
  form.value.estado = null;
  form.value.pais = null;
  form.value.residencial = null;
  form.value.comercial = null;
  form.value.celular = null;
  form.value.cpf = null;
  form.value.rg = null;
}

export function atualizarFormulario(form, val) {
  form.value.nome = val.nome;
  form.value.genero = val.genero;
  form.value.data = val.data_nasc;
  form.value.email = val.email;
  form.value.observacao = val.observacao;
  form.value.cep = val.cep;
  form.value.logradouro = val.logradouro;
  form.value.numero = val.numero;
  form.value.complemento = val.complemento;
  form.value.bairro = val.bairro;
  form.value.cidade = val.cidade;
  form.value.estado = val.uf;
  form.value.pais = val.pais;
  form.value.residencial = val.tel_resid;
  form.value.comercial = val.tel_com;
  form.value.celular = val.cel;
  form.value.cpf = val.cpf;
  form.value.rg = val.rg;
}


</script>
<style scoped>
div[class*="col"],
h3 {
  margin: 5px;
}

.col-8 {
  margin: 0 !important;
}
</style>
