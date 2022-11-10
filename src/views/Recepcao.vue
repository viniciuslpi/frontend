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
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue'
import axios from 'axios'

// var stringOptions = [
//   { label: 'Rogério Falcão Rueda', value: 1 },
//   { label: 'Camila Rosa', value: 2 },
//   { label: 'Estevão Rueda', value: 3 },
//   { label: 'Vitor Ramalho', value: 4 },
//   { label: 'Maria Olivia', value: 5 },
// ]

export default {
  name: "Recepcao",
   setup () {
    const options = ref(stringOptions)
    const codigo = ref("");
    var stringOptions = [] 

    return {
      model: ref(null),
      options,
      codigo,

      inputFn(val) {
        console.log(val)
      },

      addFn(val) {
        console.log(val)
      },

      updateFn(val) {
        if (val && typeof val === "object") {
          console.log(val)
          codigo.value = val.label
        }
      },

      filterFn (val, update, abort) {
        // codigo para tratamento da inserção de dado (novo cadastro)
        /*if (true) {
          update(() => {
            options.value = [];
          })
          return
        }*/

        if (val.length < 3) {
          abort()
          return
        }

        update(async () => {
          stringOptions   = await axios.get(`/api/recepcao/v1/pessoas/${val}`)
          const { data }  = stringOptions
          const needle    = val.toLowerCase()
          options.value   = data.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
        })

      }
    }
  }
}
</script>
