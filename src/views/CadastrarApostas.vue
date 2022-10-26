<template>
    <div>
        <div>
            <!-- //para o tabview v-model:activeIndex="active2"  -->
            <TabView :scrollable="true">
                <TabPanel  v-for="tab in gruposTabs" :key="tab.letra" :header="tab.letra">
                    <div class="painelDeApostas">
                        <div class="agenda">
                            <div v-for="jogo in tab.jogos" :key="jogo.matchNumber" class="agenda__game">
                                <div class="nomeDoJogo">
                                    <span>{{jogo.stadium}}</span>
                                </div>
                                <div class="agenda__game__container">
                                    <div class="agenda__game__team--left col-5">
                                        <div  v-html="'<img src = src/assets/imgs/flags/'+jogo.homeFlag+'.png>'" layout="responsive" class="agenda__game__team__shield">        
                                        </div>
                                        <div class="agenda__game__team__name">
                                           {{jogo.homeTeam}}
                                        </div>  
                                    </div>
                                    <div class="agenda__game__info col-2">
                                        X
                                    </div>
                                    <div class="agenda__game__team--right col-5">
                                        <div class="agenda__game__team__shield">
                                            <div  v-html="'<img src = src/assets/imgs/flags/'+jogo.awayFlag+'.png>'" layout="responsive" class="agenda__game__team__shield">        
                                        </div>
                                        </div>
                                            <div class="agenda__game__team__name"> {{jogo.awayTeam}}
                                        </div>
                                    </div>
                                </div>
                                <div class="agenda__game__info__time">{{jogo.date}}</div>
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

    import { onBeforeMount, ref } from 'vue';
    import Card from 'primevue/card';
    import TabPanel from 'primevue/TabPanel';
    import TabView from 'primevue/TabView';
    import jogos from '../assets/jogosdacopa.json';

    const todosOsJogos = jogos.jogos;
    const gruposTabs = ref([])
    const alemanha = ref('alemanha')


    onBeforeMount(() => {
        geraGrupos()
    })
    function retira_acentos(str) 
        {
        let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
        let sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr".toLocaleLowerCase();
        let novastr="";
            for(let i=0; i<str.length; i++) {
                let troca=false;
                for (let a=0; a<com_acento.length; a++) {
                    if (str.substr(i,1)==com_acento.substr(a,1)) {
                        novastr+=sem_acento.substr(a,1);
                        troca=true;
                        break;
                    }
                }
                if (troca==false) {
                    novastr+=str.substr(i,1);
                }
            }
            return novastr;
        }    


    const geraGrupos = () => {
        let letrasGrupos = ['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D', 'Grupo E', 'Grupo F', 'Grupo G', 'Grupo H']
        gruposTabs.value = letrasGrupos.map((letra) => {
            return { 'letra': letra, jogos: {} }
        })
        
        let jogosPorGrupo = { 'Grupo A': [], 'Grupo B': [], 'Grupo C': [], 'Grupo D': [], 'Grupo E': [], 'Grupo F': [], 'Grupo G': [], 'Grupo H': [] }
        
        //console.log(todosOsJogos)   
        todosOsJogos.forEach(element => {
            element.homeFlag = retira_acentos(element.homeTeam);
            element.homeFlag = element.homeFlag.replace(/\s/g, '');
            element.awayFlag = retira_acentos(element.awayTeam);
            element.awayFlag = element.awayFlag.replace(/\s/g, '');
            if (element.group) {
                jogosPorGrupo[element.group].push(element)
            }
        });
        gruposTabs.value.forEach((grupo) => {
            //let letra = ;
            grupo.jogos = jogosPorGrupo[grupo.letra]
          /*   console.log(grupo.letra)
            console.log(grupo.jogos[1]) */
        })

    }
</script>