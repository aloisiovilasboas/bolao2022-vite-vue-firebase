<template>
  <div v-if="store.loading">
    <h3>Carregando...</h3>
    <ProgressSpinner />
  </div>

  <div>
    <div>

      <DataTable :value=store.ranking>
        <Column header="#" headerStyle="width:3em">
          <template #body="slotProps">
            {{ slotProps.index + 1 }}
          </template>
        </Column>
        <Column field="nome" header="nome"></Column>




      </DataTable>


    </div>

  </div>




</template>

<script setup>


import ProgressSpinner from 'primevue/progressspinner';
import { useRankingStore } from "../stores/ranking"

const store = useRankingStore();


/* const products = ref();
const nameInput = ref("");
const deleteUsuarioDialog = ref(false);
const pagoUsuarioDialog = ref(false)
const naoPagoUsuarioDialog = ref(false)
const uDelete = ref({});
const uPago = ref({}); */




</script>
  
  
  