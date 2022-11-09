<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md" style="width: 50%;margin: auto;">

      <q-select behavior="menu" outlined v-model="inputEntidade" use-input hide-selected fill-input input-debounce="0"
        :options="options" @filter="filterFn" @update:model-value="updateFn"
        hint="Minimum 3 characters to trigger filtering" style="width: 100%; padding-bottom: 32px" label="Entidade">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-input v-model="inputNumAtendimento" label="Número do atendimento" outlined style="width: 100%;"
        hint="Minimum 3 characters to trigger filtering" />
      <q-btn type="submit" btn_size_rd_md color="primary" size="md" label="SALVAR" />
    </q-form>
  </div>
</template>
<script>

import { ref } from "vue";

var stringOptions = [
  { label: 'Cigano Don Carlos Ramirez', value: 1 },
  { label: 'Cigano Julio Del Toro', value: 2 },
  { label: 'Zequinha Boiadeiro', value: 3 },
  { label: 'Augusto Irineu', value: 4 },
  { label: 'Baiano Zé do Coco', value: 5 },
]


export default {

  name: "Baixa",
  setup() {
    const options = ref(stringOptions)
    const inputNumAtendimento = ref("");
    const inputEntidade = ref("")
    // var stringOptions = [] 

    return {
      inputEntidade,
      options,
      inputNumAtendimento,

      updateFn(val) {
        if (val && typeof val === "object") {
          console.log(val)
          inputEntidade.value = val.label
        }
      },

      filterFn(val, update, abort) {
        if (val.length < 3) {
          abort()
          return
        }

        update(async () => {
          // stringOptions   = await axios.get(`/api/recepcao/v1/pessoas/${val}`)
          // const { data }  = stringOptions
          const needle = val.toLowerCase()
          options.value = stringOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
        })

      },

      onSubmit() {
        const formData = {
          entidade: inputEntidade.value,
          atendimento: inputNumAtendimento.value
        }
        console.log(formData);
        inputEntidade.value = null
        inputNumAtendimento.value = null
      },


    }
  }
}
</script>
