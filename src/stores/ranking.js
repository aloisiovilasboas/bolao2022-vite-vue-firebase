import { ref } from "vue";
import { defineStore } from "pinia";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import router from "../router";

export const useRankingStore = defineStore("ranking", {
  state: () => {
    const ranking = ref([{
      ultimojogo:{},
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



    
    return {
      ranking,
      setRanking
    };
  },
  actions:{
    async cadastraRanking(jogs) {
      try {
          const docRef = await setDoc(doc(db, "ranking", '0'), { jogadores: jogs });
          this.setRanking([{jogadores: jogs}])
          console.log('cadastraRanking');
          console.log(this.ranking);
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
      const colRef = collection(db, "ranking");
      getDocs(colRef)
        .then((snapshot) => {
          this.ranking = [];
          snapshot.docs.forEach((doc) => {
        //    console.log(doc.data().jogadores)
            let unovo = { jogadores: doc.data().jogadores, idRodada: doc.id };
            this.ranking.push(unovo);
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
