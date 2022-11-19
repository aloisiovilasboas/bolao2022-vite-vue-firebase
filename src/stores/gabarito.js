import { ref } from "vue";
import { defineStore } from "pinia";
import { setDoc, getDoc, collection, getDocs, doc } from "firebase/firestore";
import { db } from "../services/firebase"
import router from "../router";


export const useGabaritoStore = defineStore("gabarito", {
    state: () => {

      /*   const ultimoJogo = ref() */
        const completo = ref(false)
        const campeao = ref([])
        const mataMata = ref([])
        const grupos = ref([{ letra: 'a' }])
        const gabaritoRAW = ref({ grupos: null })


        const todasAsApostas = ref([{ grupos: [], mataMata: [] }])




        //const apostas = ref([{letra:'',jogos:[],classificacao:[]}])
        /* 
        grupoTabs = [{letra:'Grupo A', jogos:[-jogosPorGrupoA-], classificacao:[{nome:Qatar,bandeira:qatar,p:0,v:0,s:0,gp:0},{nome...}] }]
        
        
        
        */
        const setGabaritoRAW = (newvalue) => {
            gabaritoRAW.value = newvalue;
            // console.log(apostas)
        }

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
        const setTodasAsApostas = (newvalue) => {
            todasAsApostas.value = newvalue;
            // console.log(apostas)
        }

        return {

            gabaritoRAW,
            setGabaritoRAW,
          /*   ultimoJogo, */
            grupos,
            mataMata,
            campeao,
            completo,
            setGrupos,
            setMatamata,
            setCampeao,
            setCompleto,
            todasAsApostas,
            setTodasAsApostas
        }
    },
    actions: {
        async cadastraGabarito(grupos, mataMata) {
            try {
                const docRef = await setDoc(doc(db, "gabarito", '0'), { grupos: grupos, mataMata: mataMata });
              //  this.setGabaritoRAW({ grupos: grupos, mataMata: mataMata })
                alert("Gabarito cadastrado!");
             //   router.push('/')
                // console.log(doc);
                // console.log("Document written with ID: ", docRef.id);
                // linkCadastro.value = docRef.id
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },

        async fetchApostas() {
            const colRef = collection(db, "apostas");
            
            try{
            getDocs(colRef)
                .then((snapshot) => {
                    let apos = []
                    snapshot.docs.forEach((doc) => {
                  //      console.log('apostas')
                        let unovo = { ...doc.data(), idUsuario: doc.id };
                        apos.push(unovo);
                    });
                    this.setTodasAsApostas(apos);
                 //   console.log(this.todasAsApostas);
                })
                .catch((err) => {
                    console.log(err.message);
                });
            } catch(e){
                console.error("Error fetching apostas: ", e);
            }
        },

        async fetchGabarito() {
            const docRef = doc(db, "gabarito", '0');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                /* console.log("Document data:", docSnap.data()); */
                let d = { ...docSnap.data(), id: '0' }
               /*  console.log('gabarito:');
                console.log(d) */
                this.setGabaritoRAW(d)
                //      this.geraGrupos()
                return d
            } else {
                //this.user.loading = false
                // this.user.valido = false
                // doc.data() will be undefined in this case
                console.log("nao existe aposta com esse id:" + id);
                return false
            }
        },


    }
});
