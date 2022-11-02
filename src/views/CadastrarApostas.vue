<template>
    <div>
        <div>
            <!-- //para o tabview v-model:activeIndex="active2"  -->
            <TabView :scrollable="true">
                <TabPanel v-for="tab in apostasStore.grupos" :key="tab.letra" :header="tab.letra">
                    <div class="painelDeApostas">
                        <div class="agenda">
                            <div v-for="jogo in tab.jogos" :key="jogo.matchNumber" class="agenda__game">
                                <div class="nomeDoJogo">
                                    <span>{{ jogo.stadium }}</span>
                                </div>
                                <div class="agenda__game__container">
                                    <div class="agenda__game__team--left col-4">
                                        <!-- <div v-html="'<img src = src/assets/imgs/flags/' + jogo.homeFlag + '.png>'"
                                            layout="responsive" class="agenda__game__team__shield">
                                        </div> -->

                                        <div v-html="'<img src =' + jogo.homeFlagurl + '>'" layout="responsive"
                                            class="agenda__game__team__shield">
                                        </div>
                                        <div class="agenda__game__team__name">
                                            {{ jogo.homeTeam }}
                                        </div>
                                    </div>
                                    <div class="agenda__game__info col-4">
                                        <InputText type="text"
                                            @change="updatePartida(jogo.homeTeam, jogo.awayTeam, tab.letra)"
                                            v-model=jogo.resultA class="p-inputtext-sm placar" />
                                        X
                                        <InputText type="text"
                                            @change="updatePartida(jogo.homeTeam, jogo.awayTeam, tab.letra)"
                                            v-model=jogo.resultB class="p-inputtext-sm placar" />
                                    </div>
                                    <div class="agenda__game__team--right col-4">
                                        <div class="agenda__game__team__shield">

                                            <div v-html="'<img src =' + jogo.awayFlagurl + '>'" layout="responsive"
                                                class="agenda__game__team__shield">
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

                    <!--  <div class="card"> -->
                    <DataTable :value="tab.classificacao" class="p-datatable-sm" responsiveLayout="scroll">

                        <!-- <template #header>
                                Small Table
                            </template> -->
                        <Column header="Classificação" style="min-width:12rem">
                            <template #body="{ data }">
                                <div class="nomeEbandeira">
                                    <div v-html="'<img src = ' + data.bandeira + '>'" layout="responsive"
                                        class="agenda__game__team__shield">
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
                    <!--  </div> -->
                </TabPanel>
                <TabPanel v-for="tab in apostasStore.mataMata" :key="tab.fase" :header="tab.fase">
                    <div class="painelDeApostas">
                        <div class="agenda">
                            <div v-for="jogo in tab.jogos" :key="jogo.matchNumber" class="agenda__game">
                                <div class="nomeDoJogo">
                                    <span>{{ jogo.stadium }}</span>
                                </div>


                                <div class="agenda__game__container">
                                    <div class="agenda__game__team--left col-4">
                                        <!-- <div v-html="'<img src = src/assets/imgs/flags/' + jogo.homeFlag + '.png>'"
                                            layout="responsive" class="agenda__game__team__shield">
                                        </div> -->

                                        <div v-if="jogo.homeFlagurl != null"
                                            v-html="'<img src =' + jogo.homeFlagurl + '>'" layout="responsive"
                                            class="agenda__game__team__shield">
                                        </div>
                                        <div class="agenda__game__team__name">
                                            {{ jogo.homeTeam }}
                                        </div>
                                    </div>
                                    <div class="agenda__game__info2 col-4">
                                        <RadioButton inputId=jogo.inputidhome name=jogo.matchNumber value=home :disabled="((jogo.homeFlagurl === undefined )||(jogo.awayFlagurl === undefined )||(jogo.homeFlagurl === null )||(jogo.awayFlagurl === null ))"
                                            @change="updatePartidaMatamata(jogo, tab.fase)" v-model="jogo.winner" />
                                        <div>X</div>
                                        <RadioButton inputId=jogo.inputidaway name=jogo.matchNumber value=away :disabled="((jogo.homeFlagurl === undefined )||(jogo.awayFlagurl === undefined )||(jogo.homeFlagurl === null )||(jogo.awayFlagurl === null ))"
                                            @change="updatePartidaMatamata(jogo, tab.fase)" v-model=jogo.winner />
                                    </div>
                                    <div class="agenda__game__team--right col-4">
                                        <div class="agenda__game__team__shield">

                                            <div v-if="jogo.awayFlagurl != null"
                                                v-html="'<img src =' + jogo.awayFlagurl + '>'" layout="responsive"
                                                class="agenda__game__team__shield">
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
                </TabPanel>
            </TabView>

        </div>

    </div>
</template>
<script setup>

import { getStorage, getDownloadURL } from "firebase/storage";
import { ref as ref2 } from "firebase/storage"
import { onBeforeMount, ref, onServerPrefetch, onMounted, reactive } from 'vue';
import InputText from 'primevue/inputtext';
import Image from "primevue/image";
import Card from 'primevue/card';
import RadioButton from 'primevue/radiobutton'
import TabPanel from 'primevue/TabPanel';
import TabView from 'primevue/TabView';
import jogos from '../assets/jogosdacopa.json';
import paises from '../assets/nomepaises.json';
import bandeiras from '../assets/linksBandeiras.json';
import { useApostasStore } from "../stores/apostas";


const todosOsJogos = jogos.jogos;
const todosOsPaises = paises.paises
const todasAsBandeiras = bandeiras.bandeiras
const loading = ref(true)
const gruposTabs = reactive([])
const matamataTabs = reactive([])
//const bandeiras = ref([])
const apostasStore = useApostasStore();
const storage = getStorage();



onMounted(async () => {
    // console.log('todos');
    /* 
    await todosOsPaises.forEach(element => {  
     //   console.log(element);
        bandeiras.value[element] = pegaBandeira(element)
        
    });
    console.log(bandeiras); */
    /* await pegaBandeiras().then( () => {
        console.log()
        geraGrupos()
        
    }) */
    geraGrupos()

})
/* onMounted ( () => {
    geraGrupos()
}) 
 */



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
    let nomefases = ['Oitavas', 'Quartas', 'Semifinais', 'Final']

    let jogosPorGrupo = { 'Grupo A': [], 'Grupo B': [], 'Grupo C': [], 'Grupo D': [], 'Grupo E': [], 'Grupo F': [], 'Grupo G': [], 'Grupo H': [] }
    let timesPorGrupo = { 'Grupo A': [], 'Grupo B': [], 'Grupo C': [], 'Grupo D': [], 'Grupo E': [], 'Grupo F': [], 'Grupo G': [], 'Grupo H': [] }
    let jogosmataMata = { 'Oitavas': [], 'Quartas': [], 'Semifinais': [], 'Final': [] }
    //console.log(todosOsJogos)   
    todosOsJogos.forEach(element => {
        element.homeFlag = retira_acentos(element.homeTeam);
        element.homeFlag = element.homeFlag.replace(/\s/g, '').toLowerCase();
        element.awayFlag = retira_acentos(element.awayTeam);
        element.awayFlag = element.awayFlag.replace(/\s/g, '').toLowerCase();
        if (element.group) {
            element.homeFlagurl = todasAsBandeiras.find(bandeira => bandeira.pais === element.homeFlag).bandeira
            element.awayFlagurl = todasAsBandeiras.find(bandeira => bandeira.pais === element.awayFlag).bandeira
            jogosPorGrupo[element.group].push(element)
            if (!timesPorGrupo[element.group].includes(element.homeTeam)) {
                timesPorGrupo[element.group].push(element.homeTeam)
            }
        } else if (element.roundNumber != 'Terceiro') {
            element.inputidhome = element.homeTeam
            element.inputidaway = element.awayTeam
            jogosmataMata[element.roundNumber].push(element)

        }
    });
    gruposTabs.value = letrasGrupos.map((nomeGrupo) => {
        return { letra: nomeGrupo, jogos: {}, classificacao: [] }
    })
    matamataTabs.value = nomefases.map((nomeFase) => {
        return { fase: nomeFase, jogos: {} }
    })

    gruposTabs.value.forEach((grupo) => {
        grupo.jogos = jogosPorGrupo[grupo.letra]
        grupo.classificacao = timesPorGrupo[grupo.letra].map((nometime) => {
            let b = nometime.replace(/\s/g, '')
            return { nome: nometime, bandeira: todasAsBandeiras.find(bandeira => bandeira.pais === retira_acentos(b).replace(/\s/g, '').toLowerCase()).bandeira, p: 0, v: 0, e: 0, d: 0, s: 0, gp: 0, gc: 0 }
        })
    })
    matamataTabs.value.forEach((etapa) => {
        etapa.jogos = jogosmataMata[etapa.fase]
        /* grupo.classificacao = timesPorGrupo[grupo.letra].map((nometime) => {
            let b = nometime.replace(/\s/g, '')
            return { nome: nometime, bandeira: todasAsBandeiras.find(bandeira => bandeira.pais === retira_acentos(b).replace(/\s/g, '').toLowerCase()).bandeira, p: 0, v: 0, e: 0, d: 0, s: 0, gp: 0, gc: 0 }
        }) */
    })
    apostasStore.setGrupos(gruposTabs.value)
    apostasStore.setMatamata(matamataTabs.value)
    // console.log(matamataTabs.value);


}


const updatePartida = ((nometime1, nometime2, nomegrupo) => {
    // console.log(bandeiras.value)

    let grupoIndex = gruposTabs.value.findIndex(grupo => grupo.letra === nomegrupo)
    let timeIndex1 = gruposTabs.value[grupoIndex].classificacao.findIndex(time => time.nome === nometime1)
    let timeIndex2 = gruposTabs.value[grupoIndex].classificacao.findIndex(time => time.nome === nometime2)
    calculaPontuacao(timeIndex1, grupoIndex)
    calculaPontuacao(timeIndex2, grupoIndex)
    ordenaTabela(grupoIndex)

    let completo = true;
    gruposTabs.value[grupoIndex].classificacao.forEach((time) => {
        if (time.v + time.e + time.d !== 3) {
            completo = false
        }
    })
    if (completo) {
        updateOitavas(grupoIndex)
    } else {
        desmarcaOitavas(grupoIndex)
    }
})

const updatePartidaMatamata = ((jogo, fase) => {

    let matchNumber = jogo.matchNumber
    let numFase = 3
    if (fase === 'Oitavas') {
        numFase = 0
    }
    else if (fase === 'Quartas') {
        numFase = 1
    }
    else if (fase === 'Semifinais') {
        numFase = 2
    } else {
        numFase = 3
    }
    if (numFase <= 2) {
        //ve se o ganhador eh home ou away
        let home = true
        let jogoindex = matamataTabs.value[numFase + 1].jogos.findIndex((jogo) => jogo.inputidhome.slice(-1) === matchNumber.toString().slice(-1));
        if (jogoindex === -1) {
            home = false
            jogoindex = matamataTabs.value[numFase + 1].jogos.findIndex((jogo) => jogo.inputidaway.slice(-1) === matchNumber.toString().slice(-1));
        }

        let winner = null
        if (jogo.winner === 'home') {
            winner = { 'team': jogo.homeTeam, 'flagurl': jogo.homeFlagurl }
        } else if (jogo.winner === 'away') {
            winner = { 'team': jogo.awayTeam, 'flagurl': jogo.awayFlagurl }
        }

        //ve se a posicao do ganhador na prox fase eh home ou away
        if (home) {
            matamataTabs.value[numFase + 1].jogos[jogoindex].homeTeam = winner.team
            matamataTabs.value[numFase + 1].jogos[jogoindex].homeFlagurl = winner.flagurl
            matamataTabs.value[numFase + 1].jogos[jogoindex].winner = null
        } else {
            //console.log(matamataTabs.value[numFase + 1].jogos[jogoindex])
            matamataTabs.value[numFase + 1].jogos[jogoindex].awayTeam = winner.team
            matamataTabs.value[numFase + 1].jogos[jogoindex].awayFlagurl = winner.flagurl
            matamataTabs.value[numFase + 1].jogos[jogoindex].winner = null
        }
        //console.log(matamataTabs.value[numFase + 1].jogos[jogoindex])
        desmarcaFasesSeguintes(matamataTabs.value[numFase + 1].jogos[jogoindex], numFase + 1)
    }
})

const desmarcaFasesSeguintes = ((jogo, numFase) => {

    let matchNumber = jogo.matchNumber
    console.log(jogo);
    if (numFase <= 2) {
        //ve se o ganhador eh home ou away
        let home = true
        let jogoindex = matamataTabs.value[numFase + 1].jogos.findIndex((j) => j.inputidhome.slice(-1) === matchNumber.toString().slice(-1));
        if (jogoindex === -1) {
            home = false
            jogoindex = matamataTabs.value[numFase + 1].jogos.findIndex((j) => j.inputidaway.slice(-1) === matchNumber.toString().slice(-1));
        }

        let jogoSeguinte = matamataTabs.value[numFase + 1].jogos[jogoindex]
        jogoSeguinte.winner = null
        if (home) {
            jogoSeguinte.homeTeam = jogoSeguinte.inputidhome
            jogoSeguinte.homeFlagurl = null
        } else {
            jogoSeguinte.awayTeam = jogoSeguinte.inputidaway
            jogoSeguinte.awayFlagurl = null
        }
        //matamataTabs.value[numFase + 1].jogos[jogoindex].winner = null
        desmarcaFasesSeguintes(matamataTabs.value[numFase + 1].jogos[jogoindex], numFase + 1)
    }

})



const updateOitavas = ((grupoIndex) => {
    let grupo = gruposTabs.value[grupoIndex]
    let letra = grupo.letra

    //console.log(letra.slice(-1))

    let jogoindex1 = matamataTabs.value[0].jogos.findIndex((jogo) => jogo.inputidhome.slice(-1) === letra.slice(-1));
    //console.log(grupo.classificacao);
    matamataTabs.value[0].jogos[jogoindex1].homeTeam = grupo.classificacao[0].nome
    matamataTabs.value[0].jogos[jogoindex1].homeFlagurl = grupo.classificacao[0].bandeira
    matamataTabs.value[0].jogos[jogoindex1].winner = null

    let jogoindex2 = matamataTabs.value[0].jogos.findIndex((jogo) => jogo.inputidaway.slice(-1) === letra.slice(-1));
    matamataTabs.value[0].jogos[jogoindex2].awayTeam = grupo.classificacao[1].nome
    matamataTabs.value[0].jogos[jogoindex2].awayFlagurl = grupo.classificacao[1].bandeira
    matamataTabs.value[0].jogos[jogoindex2].winner = null

    desmarcaFasesSeguintes(matamataTabs.value[0].jogos[jogoindex1],0)
    desmarcaFasesSeguintes(matamataTabs.value[0].jogos[jogoindex2],0)
    //matamataTabs.value.findIndex(grupo => grupo.letra === nomegrupo.slice(-1))

})
const desmarcaOitavas = ((grupoIndex) => {
    let grupo = gruposTabs.value[grupoIndex]
    let letra = grupo.letra

    let jogoindex1 = matamataTabs.value[0].jogos.findIndex((jogo) => jogo.inputidhome.slice(-1) === letra.slice(-1));
    matamataTabs.value[0].jogos[jogoindex1].homeTeam = matamataTabs.value[0].jogos[jogoindex1].inputidhome
    matamataTabs.value[0].jogos[jogoindex1].winner = null
    matamataTabs.value[0].jogos[jogoindex1].homeFlagurl = null

    let jogoindex2 = matamataTabs.value[0].jogos.findIndex((jogo) => jogo.inputidaway.slice(-1) === letra.slice(-1));
    matamataTabs.value[0].jogos[jogoindex2].awayTeam = matamataTabs.value[0].jogos[jogoindex2].inputidaway
    matamataTabs.value[0].jogos[jogoindex2].awayFlagurl = null
    matamataTabs.value[0].jogos[jogoindex2].winner = null

    desmarcaFasesSeguintes(matamataTabs.value[0].jogos[jogoindex1],0)
 //   desmarcaFasesSeguintes(matamataTabs.value[0].jogos[jogoindex2],0)

})


const ordenaTabela = ((grupoIndex) => {
    let partidas = gruposTabs.value[grupoIndex].jogos
    let tabela = gruposTabs.value[grupoIndex].classificacao
    tabela.sort((timea, timeb) => {
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

})

const calculaPontuacao = ((timeIndex, grupoIndex) => {
    let jogos = gruposTabs.value[grupoIndex].jogos
    let time = gruposTabs.value[grupoIndex].classificacao[timeIndex]

    // console.log(jogos)

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