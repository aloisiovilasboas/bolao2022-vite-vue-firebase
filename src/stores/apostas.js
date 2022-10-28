import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useApostasStore = defineStore ("apostas" ,{
    state: () => {
        const linksBandeiras =ref([])
        const apostas = ref([{letra:'a'}])
        //const apostas = ref([{letra:'',jogos:[],classificacao:[]}])
        /* 
        grupoTabs = [{letra:'Grupo A', jogos:[-jogosPorGrupoA-], classificacao:[{nome:Qatar,bandeira:qatar,p:0,v:0,s:0,gp:0},{nome...}] }]
        
        
        
        */
        
        const setApostas = (newvalue) => {
            apostas.value = newvalue;
            console.log(apostas)
        }
        return {
            apostas,
            setApostas
        }
    }
});
