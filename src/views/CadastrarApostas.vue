<template>
    <div>
        <div>
            <!-- //para o tabview v-model:activeIndex="active2"  -->
            <TabView :scrollable="true">
                <TabPanel v-for="tab in apostasStore.apostas" :key="tab.letra" :header="tab.letra">
                    <div class="painelDeApostas">
                        <div class="agenda">
                            <div v-for="jogo in tab.jogos" :key="jogo.matchNumber" class="agenda__game">
                                <div class="nomeDoJogo">
                                    <span>{{ jogo.stadium }}</span>
                                </div>
                                <div class="agenda__game__container">
                                    <div class="agenda__game__team--left col-4">
                                        <div v-html="'<img src = src/assets/imgs/flags/' + jogo.homeFlag + '.png>'"
                                            layout="responsive" class="agenda__game__team__shield">
                                        </div>
                                        <div class="agenda__game__team__name">
                                            {{ jogo.homeTeam }}
                                        </div>
                                    </div>
                                    <div class="agenda__game__info col-4">
                                        <InputText type="text" @change="updatePartida(jogo.homeTeam,jogo.awayTeam,tab.letra)" v-model=jogo.resultA class="p-inputtext-sm placar" />
                                        X
                                        <InputText type="text" @change="updatePartida(jogo.homeTeam,jogo.awayTeam,tab.letra)" v-model=jogo.resultB class="p-inputtext-sm placar" />
                                    </div>
                                    <div class="agenda__game__team--right col-4">
                                        <div class="agenda__game__team__shield">
                                            <div v-html="'<img src = src/assets/imgs/flags/' + jogo.awayFlag + '.png>'"
                                                layout="responsive" class="agenda__game__team__shield">
                                            </div>
                                        </div>
                                        <div class="agenda__game__team__name"> {{ jogo.awayTeam }}
                                        </div>
                                    </div>
                                </div>
                                <div class="agenda__game__info__time">{{ jogo.date }}</div>
                                <div class="col-10">
                                    <hr>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <DataTable :value="tab.classificacao" class="p-datatable-sm" responsiveLayout="scroll">

                            <!-- <template #header>
                                Small Table
                            </template> -->
                            <Column header="Classificação" style="min-width:12rem">
                                <template #body="{ data }">
                                    <div class="nomeEbandeira">
                                        <div v-html="'<img src = src/assets/imgs/flags/' + data.bandeira + '.png>'"
                                            layout="responsive" class="agenda__game__team__shield">
                                        </div>
                                        <span class="image-text agenda__game__team__name">{{ data.nome }}</span>
                                    </div>
                                </template>
                            </Column>
                            <Column field="p" header="P"></Column>
                            <Column field="v" header="V"></Column>
                            <Column field="s" header="SG"></Column>
                            <Column field="gp" header="GP"></Column>
                        </DataTable>
                    </div>
                </TabPanel>
            </TabView>
        </div>

    </div>
</template>
<script setup>

import { onBeforeMount, ref } from 'vue';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import TabPanel from 'primevue/TabPanel';
import TabView from 'primevue/TabView';
import jogos from '../assets/jogosdacopa.json';
import { useApostasStore } from "../stores/apostas";

const todosOsJogos = jogos.jogos;
const gruposTabs = ref([])
const apostasStore = useApostasStore();



onBeforeMount(() => {
    geraGrupos()
})

function retira_acentos(str) {
    let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    let sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr".toLocaleLowerCase();
    let novastr = "";
    for (let i = 0; i < str.length; i++) {
        let troca = false;
        for (let a = 0; a < com_acento.length; a++) {
            if (str.substr(i, 1) == com_acento.substr(a, 1)) {
                novastr += sem_acento.substr(a, 1);
                troca = true;
                break;
            }
        }
        if (troca == false) {
            novastr += str.substr(i, 1);
        }
    }
    return novastr;
}


    

    const geraGrupos = () => {
        let letrasGrupos = ['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D', 'Grupo E', 'Grupo F', 'Grupo G', 'Grupo H']
        gruposTabs.value = letrasGrupos.map((nomeGrupo) => {
            return { letra: nomeGrupo, jogos: {}, classificacao: [] }
        })

        let jogosPorGrupo = { 'Grupo A': [], 'Grupo B': [], 'Grupo C': [], 'Grupo D': [], 'Grupo E': [], 'Grupo F': [], 'Grupo G': [], 'Grupo H': [] }

        let timesPorGrupo = { 'Grupo A': [], 'Grupo B': [], 'Grupo C': [], 'Grupo D': [], 'Grupo E': [], 'Grupo F': [], 'Grupo G': [], 'Grupo H': [] }
        //console.log(todosOsJogos)   
        todosOsJogos.forEach(element => {
            element.homeFlag = retira_acentos(element.homeTeam);
            element.homeFlag = element.homeFlag.replace(/\s/g, '');
            element.awayFlag = retira_acentos(element.awayTeam);
            element.awayFlag = element.awayFlag.replace(/\s/g, '');
            if (element.group) {
                jogosPorGrupo[element.group].push(element)
                if (!timesPorGrupo[element.group].includes(element.homeTeam)) {
                    timesPorGrupo[element.group].push(element.homeTeam)
                //    console.log(element.group + ' ' + timesPorGrupo[element.group])
                }
            }
        });
        gruposTabs.value = letrasGrupos.map((nomeGrupo) => {
            return { letra: nomeGrupo, jogos: {}, classificacao: [] }
        })
        gruposTabs.value.forEach((grupo) => {
            grupo.jogos = jogosPorGrupo[grupo.letra]
            grupo.classificacao = timesPorGrupo[grupo.letra].map((nometime) => {
                let b = nometime.replace(/\s/g, '')
                return { nome: nometime, bandeira: retira_acentos(b), p: 0, v: 0, e:0,d:0, s: 0, gp: 0,gc:0 }

            })
        })
        apostasStore.setApostas(gruposTabs.value)
      //  console.log(gruposTabs.value)
      //  console.log(apostasStore.apostas)
        /* 
        grupoTabs = [{letra:'Grupo A', jogos:[-jogosPorGrupoA-], classificacao:[{nome:Qatar,bandeira:qatar,p:0,v:0,s:0,gp:0},{nome...}] }]
        
        
        
        */
    }

    const updatePartida = ((nometime1,nometime2,nomegrupo) => {
    //    console.log(nometime,nomegrupo)
    //    console.log(gruposTabs.value.find(grupo => grupo.letra === nomegrupo).classificacao);
        let grupoIndex = gruposTabs.value.findIndex(grupo => grupo.letra === nomegrupo)
        //console.log(gruposTabs.value[grupoIndex])
        let timeIndex1 = gruposTabs.value[grupoIndex].classificacao.findIndex(time => time.nome === nometime1)
        let timeIndex2 = gruposTabs.value[grupoIndex].classificacao.findIndex(time => time.nome === nometime2)
        calculaPontuacao(timeIndex1,grupoIndex)
        calculaPontuacao(timeIndex2,grupoIndex)
        ordenaTabela(grupoIndex)
      //  console.log('partida'+jogo.resultA)
    })
    const ordenaTabela = ((grupoIndex) => {
        let partidas = gruposTabs.value[grupoIndex].jogos
        let tabela = gruposTabs.value[grupoIndex].classificacao
        tabela.sort( (timea, timeb)=> {
         // console.log(timea.p - timeb.p)
          if (timeb.p - timea.p !== 0) {
            return timeb.p - timea.p
          } else {
            if (timeb.sg - timea.sg !== 0) {
              return timeb.sg - timea.sg
            } else {
              if (timeb.gp - timea.gp !== 0) {
                return timeb.gp - timea.gp
              } else {
                //confronto direto
                var pindex = partidas.findIndex((partida) => {
                  return ((partida.homeTeam === timea.nome && partida.awayTeam === timeb.nome) || (partida.homeTeam === timeb.nome && partida.awayTeam === timea.nome))
                })
                var partida = partidas[pindex]
                if (partida.homeTeam === timea.nome && partida.awayTeam === timeb.nome) {
                  return partida.resultB - partida.resultA
                } else {
                  return partida.resultA - partida.resultB
                }
              }
            }
          }
        })
        /* var posicao = 1
        grupo.times.forEach(time => {
          time.pos = posicao
          posicao++
         // console.log(time.sigla)
        })
        this.primeiroA = grupo.times[0]
      }
 */
    })
    const calculaPontuacaoTeste = ((timeIndex, grupoIndex) => {
        
       // console.log(gruposTabs.value[grupoIndex].classificacao[timeIndex])

    })
    const calculaPontuacao = ((timeIndex, grupoIndex) => {
        let jogos = gruposTabs.value[grupoIndex].jogos
        let time = gruposTabs.value[grupoIndex].classificacao[timeIndex]

        console.log(jogos)
        //let time = {}
        // time.dados = {p: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0}
        time.p = 0
        time.v = 0
        time.e = 0
        time.d = 0
        time.gp = 0
        time.gc = 0
        time.sg = 0
        jogos.forEach(partida => {
          if ((partida.resultA !== '' && partida.resultB !== '') && (partida.resultA !== null && partida.resultB !== null)) {
            if (time.nome === partida.homeTeam) {
              time.gp += Number(partida.resultA)
              time.gc += Number(partida.resultB)
              if (Number(partida.resultA) > Number(partida.resultB)) {
                time.p += 3
                time.v += 1
              } else if (partida.resultA === partida.resultB) {
                time.p += 1
                time.e += 1
              } else {
                time.d += 1
              }
            } else if (time.nome === partida.awayTeam) {
              time.gp += Number(partida.resultB)
              time.gc += Number(partida.resultA)
              if (Number(partida.resultA) < Number(partida.resultB)) {
                time.p += 3
                time.v += 1
              } else if (partida.resultA === partida.resultB) {
                time.p += 1
                time.e += 1
              } else {
                time.d += 1
              }
            }
          }
        })
        time.sg = Number(time.gp) - Number(time.gc)
        gruposTabs.value[grupoIndex].classificacao[timeIndex] = time
    })
    
    
</script>