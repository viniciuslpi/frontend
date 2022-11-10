<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md" style="width: 50%;margin: auto;">

      <q-select behavior="menu" outlined v-model="input.entidade" use-input hide-selected fill-input input-debounce="200"
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
        arrayEntidades.map(item => stringOptions.push(item.nome))
      } catch (err) {
        console.log(err);
      }
    })

    return {
      input,
      options,

      updateFn(val) {
        if (val && typeof val === "object") {
          console.log(val)
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
          options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1);
        })

      },

      onSubmit() {
        const formData = {
          entidade: input.value.entidade,
          atendimento: input.value.numAtendimento
        }


        if (input.value.entidade == null || input.value.numAtendimento == null) {
          console.log(">>> Os campos precisam estar preenchidos");
        } else {
          console.log(">>> Baixa de Senha Realizada");
          console.log(formData);  
          input.value.numAtendimento = null
        }
      },


    }
  }
}
</script>
