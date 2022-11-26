import { ref } from "vue";
import { defineStore } from "pinia";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import router from "../router";

export const useRankingStore = defineStore("ranking", {
  state: () => {
    const ultimoJogo = ref({homePais:{pais:'',bandeira:''},awayPais:{pais:'',bandeira:''},resultA:'',resultB:''})
    const ultimoJogo1 = ref({homePais:{pais:'',bandeira:''},awayPais:{pais:'',bandeira:''},resultA:'',resultB:''})
    const ranking = ref([{
     // ultimojogo:{homePais:{pais:'',bandeira:''},awayPais:{pais:'',bandeira:''},resultA:'',resultB:''},
      jogadores: [{
        idUsuario:'-',
        pos: 0,
        nome: '-',
        pontuacao: 0,
        grupos: 0,
        oitavas: 0,
        quartas: 0,
        semis: 0,
        final: 0,
        campeao: 0
      }]
    }])
    const setRanking = (newvalue) => {
      ranking.value = newvalue
    }
    const setUltimoJogo = (newvalue) => {
      ultimoJogo.value = newvalue
    }



    
    return {
      ranking,
      setRanking,
      ultimoJogo,
      ultimoJogo1,
      setUltimoJogo
    };
  },
  actions:{
    async cadastraRanking(jogs,uj) {
      try {
          const docRef = await setDoc(doc(db, "ranking1", '0'), { jogadores: jogs, ultimoJogo: uj });
          this.setRanking([{jogadores: jogs}])
          this.setUltimoJogo(uj)
    //      console.log('cadastraRanking');
    //      console.log(this.ranking);
          alert("Ranking cadastrado!");
          router.push('/ranking')
          // console.log(doc);
          // console.log("Document written with ID: ", docRef.id);
          // linkCadastro.value = docRef.id
      } catch (e) {
          console.error("Error adding document: ", e);
      }
  },
    async fetchRanking () {
      const colRef = collection(db, "ranking1");
      getDocs(colRef)
        .then((snapshot) => {
          //this.ranking = [];
          this.setRanking([]);
          snapshot.docs.forEach((doc) => {
        //    console.log(doc.data().jogadores)
            let unovo = { jogadores: doc.data().jogadores,  idRodada: doc.id };
            this.ranking.push(unovo);
            this.setUltimoJogo(doc.data().ultimoJogo)
         //   console.log(unovo);
          });
          console.log('fetch ranking');
          console.log(this.ranking); 
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }
   
});
