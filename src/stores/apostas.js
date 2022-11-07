import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { setDoc, collection,  getDocs, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db } from "../services/firebase"

export const useApostasStore = defineStore ("apostas" ,{
    state: () => {
        const campeao = ref([])
        const completo = ref(false)
        
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
        const setCompleto = (newvalue) => {
            completo.value = newvalue;
           // console.log(apostas)
        }
        
        return {
            grupos,
            mataMata,
            campeao,
            completo,
            setGrupos,
            setMatamata,
            setCampeao,
            setCompleto
        }
    },
    actions:{
        async cadastraApostas(uid,grupos,mataMata){
            try {
              const docRef = await setDoc(doc(db, "apostas", uid), {grupos:grupos, mataMata:mataMata});
             // console.log(doc);
             // console.log("Document written with ID: ", docRef.id);
              // linkCadastro.value = docRef.id
            } catch (e) {
              console.error("Error adding document: ", e);
            }
        },
       /*  async fetchApostaById(id){
            const docRef = doc(db, "apostas", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                let d = {...docSnap.data(), id: id}
                console.log(d)

                d.grupos.forEach(element => {
                    
                });




                return d
              } else {
                //this.user.loading = false
               // this.user.valido = false
                // doc.data() will be undefined in this case
                console.log("nao existe aposta com esse id:"+id);
                return false
              }
        } */
    }
});
