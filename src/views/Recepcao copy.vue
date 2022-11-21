<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row">
      <q-input v-model="codigo" label="Standard" />

      <q-select
        filled
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
        style="width: 250px; padding-bottom: 32px"
        label="Standard"
        behavior="menu"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
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
    var stringOptions = [];

    return {
      model: ref(null),
      options,
      codigo,

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
