import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { setDoc, collection,  getDocs, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db } from "../services/firebase"

export const useApostasStore = defineStore ("apostas" ,{
    state: () => {
        const campeao = ref([])
        
        const mataMata = ref([])
        const grupos = ref([{letra:'a'}])
        //const apostas = ref([{letra:'',jogos:[],classificacao:[]}])
        /* 
        grupoTabs = [{letra:'Grupo A', jogos:[-jogosPorGrupoA-], classificacao:[{nome:Qatar,bandeira:qatar,p:0,v:0,s:0,gp:0},{nome...}] }]
        
        
        
        */
        
        const setGrupos = (newvalue) => {
            grupos.value = newvalue;
           // console.log(apostas)
        }
        const setMatamata = (newvalue) => {
            mataMata.value = newvalue;
           // console.log(apostas)
        }
        const setCampeao = (newvalue) => {
            campeao.value = newvalue;
           // console.log(apostas)
        }
        
        return {
            grupos,
            mataMata,
            campeao,
            setGrupos,
            setMatamata,
            setCampeao,
        }
    },
    actions:{
        async cadastraApostas(uid){
            try {
              const docRef = await setDoc(doc(db, "apostas", uid), {
                grupos: this.grupos,
                mataMata: this.mataMata,
                campeao: this.campeao
              });
             // console.log(doc);
             // console.log("Document written with ID: ", docRef.id);
              // linkCadastro.value = docRef.id
            } catch (e) {
              console.error("Error adding document: ", e);
            }
        },
    }
});
