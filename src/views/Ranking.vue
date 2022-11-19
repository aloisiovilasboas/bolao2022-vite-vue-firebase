<template>
  <div v-if="store.loading">
    <h3>Carregando...</h3>
    <ProgressSpinner />
  </div>

  <div>
    <div>

      <DataTable :value=store.ranking[0].jogadores responsiveLayout="stack" breakpoint="2">
        <!-- <Column header="#" headerStyle="width:3em">
          <template #body="slotProps">
            {{ slotProps.index + 1 }}
          </template>
        </Column> -->
        <Column field="pos" header="Pos"></Column>
        <Column field="nome" header="Nome"></Column>
        <Column field="pontuacao" header="Pontos"></Column>
        <!-- <Column field="grupos" header="Grupos"></Column>
        <Column field="oitavas" header="Oitavas"></Column>
        <Column field="quartas" header="Quartas"></Column>
        <Column field="semis" header="Semis"></Column>
        <Column field="final" header="Final"></Column>
        <Column field="campeao" header="Campeão"></Column> -->




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
  
  
  