<template>
  <!-- <div v-if="store.ranking[0].jogadores.length<3">
    <h3>Carregando...</h3>
    <ProgressSpinner />
  </div> -->
  <div >
    <div>
      <DataTable :value=tabelaEstatistica responsiveLayout="stack" breakpoint="2"
        >
        <Column field="selecao" header="País"></Column>
        <Column field="Oitavas" header="Oitavas" headerStyle="width:3em"></Column>
        <Column field="Quartas" header="Quartas" headerStyle="width:3em"></Column>
        <Column field="Semifinais" header="Semis" headerStyle="width:3em"></Column>
        <Column field="Final" header="Final" headerStyle="width:3em"></Column>
        <Column field="Campeao" header="Campeão" headerStyle="width:3em"></Column>
      </DataTable>
    </div>
  </div>
</template>
<script setup>
 

import ProgressSpinner from 'primevue/progressspinner';
import Panel from 'primevue/panel'
import { useRankingStore } from "../stores/ranking";
import { useLoadingStore } from '../stores/loading';
import { useApostasStore } from '../stores/apostas';
import { ref, onMounted } from 'vue';
import router from "../router";
import estatistica from '../assets/estatistica.json';

const tabelaEstatistica = estatistica.estatistica
const tabelaPaises = ref([{nome:'',oitavas:'',quartas:'',semis:'',final:''}])
const ultimoJogo = ref({resultA:'',resultB:'', homePais:{pais:'',bandeira:''},awayPais:{pais:'',bandeira:''}})
const store = useRankingStore();
const apostasStore = useApostasStore();
const loadingStore = useLoadingStore();
const selectedCustomer1 = ref();
const rowClick = (event) => {
  /* console.log('row');
  console.log(event); */
  router.push("/jogador/" + event.data.idUsuario);
}


/* const products = ref();
const nameInput = ref("");
const deleteUsuarioDialog = ref(false);
const pagoUsuarioDialog = ref(false)
const naoPagoUsuarioDialog = ref(false)
const uDelete = ref({});
const uPago = ref({}); */

/* 
onMounted(async () => {
  //  geraGrupos()
 // ultimoJogo.value = store.ranking[0].ultimojogo
     //console.log(store.ranking[0].ultimojogo);



}) */


</script>
  
  
  