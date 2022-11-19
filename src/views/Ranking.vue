<template>
  <div v-if="store.ranking[0].jogadores.length<3">
    <h3>Carregando...</h3>
    <ProgressSpinner />
  </div>

  <div v-else>
    <div>
      <Panel>
        <template #header>
          <h3>Último Jogo</h3>
        </template>


        <div class="campeao">

          <div class="painelDeApostas">
            <div class="agenda">
              <div class="agenda__game">
                <div class="agenda__game__container">
                  <div class="agenda__game__team--left col-4">

                    <div v-html="'<img src =' + store.ultimoJogo.homePais.bandeira + ' class=bandeirinha >'" layout="responsive"
                      class="agenda__game__team__shield">
                    </div>
                    <div class="agenda__game__team__name">
                      {{ store.ultimoJogo.homePais.pais }}
                    </div>
                  </div>
                  <div class="agenda__game__info2 col-4">
                    <div>
                      {{ store.ultimoJogo.resultA }}
                    </div>
                    X
                    <div>
                      {{ store.ultimoJogo.resultB }}
                    </div>
                  </div>
                  <div class="agenda__game__team--right col-4">
                    <div class="agenda__game__team__shield">

                      <div v-html="'<img src =' + store.ultimoJogo.awayPais.bandeira + ' class=bandeirinha >'" layout="responsive"
                        class="agenda__game__team__shield">
                      </div>
                    </div>
                    <div class="agenda__game__team__name"> {{ store.ultimoJogo.awayPais.pais }}
                    </div>
                  </div>
                </div>
                <div class="col-10">
                  
                </div>
              </div>
            </div>
          </div>



          
        </div>
      </Panel>
    </div>
    <p></p>
    <div>

      <DataTable :value=store.ranking[0].jogadores responsiveLayout="stack" breakpoint="2"
        v-model:selection="selectedCustomer1" selectionMode="single" dataKey="idUsuario" @row-click="rowClick($event)">
        <!-- <Column header="#" headerStyle="width:3em">
          <template #body="slotProps">
            {{ slotProps.data.idUsuario }}
          </template>
        </Column> -->
        <Column field="pos" header="Pos" headerStyle="width:3em"></Column>

        <Column field="nome" header="Nome"></Column>
        <Column field="pontuacao" header="Pontos" headerStyle="width:3em"></Column>
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
import Panel from 'primevue/panel'
import { useRankingStore } from "../stores/ranking"
import { useLoadingStore } from '../stores/loading';
import { ref, onMounted } from 'vue';
import router from "../router";


const ultimoJogo = ref({resultA:'',resultB:'', homePais:{pais:'',bandeira:''},awayPais:{pais:'',bandeira:''}})
const store = useRankingStore();
const loadingStore = useLoadingStore();
const selectedCustomer1 = ref();
const rowClick = (event) => {
  console.log('row');
  console.log(event);
  router.push("/jogador/" + event.data.idUsuario);
}


/* const products = ref();
const nameInput = ref("");
const deleteUsuarioDialog = ref(false);
const pagoUsuarioDialog = ref(false)
const naoPagoUsuarioDialog = ref(false)
const uDelete = ref({});
const uPago = ref({}); */


onMounted(async () => {
  //  geraGrupos()
  ultimoJogo.value = store.ranking[0].ultimojogo
     //console.log(store.ranking[0].ultimojogo);



})


</script>
  
  
  