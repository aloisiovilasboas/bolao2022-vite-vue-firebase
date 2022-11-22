import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import {
  setDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import router from "../router";
import jogos from "../assets/jogosdacopa.json";
import bandeiras from "../assets/linksBandeiras.json";

export const useApostasStore = defineStore("apostas", {
  state: () => {
    const estatistica = ref([
      {
        selecao: "placeholder",
        Oitavas: 0,
        Quartas: 0,
        Semifinais: 0,
        Final: 0,
        Campeao: 0,
      },
    ]);
    const completo = ref(false);
    const campeao = ref([]);
    const mataMata = ref([]);
    const grupos = ref([{ letra: "a" }]);
    const apostasRAW = ref({ grupos: null });

    //const apostas = ref([{letra:'',jogos:[],classificacao:[]}])
    /* 
        grupoTabs = [{letra:'Grupo A', jogos:[-jogosPorGrupoA-], classificacao:[{nome:Qatar,bandeira:qatar,p:0,v:0,s:0,gp:0},{nome...}] }]
        
        
        
        */
    const setApostasRAW = (newvalue) => {
      apostasRAW.value = newvalue;
      // console.log(apostas)
    };
    const setEstatistica = (newvalue) => {
      estatistica.value = newvalue;
    };

    const setGrupos = (newvalue) => {
      grupos.value = newvalue;
      // console.log(apostas)
    };
    const setMatamata = (newvalue) => {
      mataMata.value = newvalue;
      // console.log(apostas)
    };
    const setCampeao = (newvalue) => {
      campeao.value = newvalue;
      // console.log(apostas)
    };
    const setCompleto = (newvalue) => {
      completo.value = newvalue;
      // console.log(apostas)
    };

    return {
      apostasRAW,
      setApostasRAW,
      estatistica,
      setEstatistica,
      grupos,
      mataMata,
      campeao,
      completo,
      setGrupos,
      setMatamata,
      setCampeao,
      setCompleto,
    };
  },
  actions: {
    async cadastraApostas(uid, grupos, mataMata) {
      try {
        const docRef = await setDoc(doc(db, "apostas", uid), {
          grupos: grupos,
          mataMata: mataMata,
        });
        this.setApostasRAW({ grupos: grupos, mataMata: mataMata });
        alert("Apostas cadastradas! Boa Sorte!");
        router.push("/");
        // console.log(doc);
        // console.log("Document written with ID: ", docRef.id);
        // linkCadastro.value = docRef.id
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async fetchApostaById(id) {
      const docRef = doc(db, "apostas", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        let d = { ...docSnap.data(), id: id };
        //   console.log(d)
        this.setApostasRAW(d);
        //      this.geraGrupos()
        return d;
      } else {
        //this.user.loading = false
        // this.user.valido = false
        // doc.data() will be undefined in this case
        //      console.log("nao existe aposta com esse id:" + id);
        return false;
      }
    },
    async fetchTodasAsApostas() {
      const colRef = collection(db, "apostas");
      getDocs(colRef)
        .then((snapshot) => {
          let selecoes = [
            "Catar",
            "Inglaterra",
            "Senegal",
            "Estados Unidos",
            "Argentina",
            "Dinamarca",
            "México",
            "França",
            "Marrocos",
            "Alemanha",
            "Espanha",
            "Bélgica",
            "Suíça",
            "Uruguai",
            "Portugal",
            "Brasil",
            "País de Gales",
            "Holanda",
            "Tunísia",
            "Polônia",
            "Japão",
            "Croácia",
            "Camarões",
            "Coreia do Sul",
            "Equador",
            "Irã",
            "Austrália",
            "Arábia Saudita",
            "Canada",
            "Costa Rica",
            "Gana",
            "Sérvia",
          ];
          let estatistica = selecoes.map((sel) => {
            return {
              selecao: sel,
              Oitavas: 0,
              Quartas: 0,
              Semifinais: 0,
              Final: 0,
              Campeao: 0,
            };
          });

          //this.todasAsApostasRAW = []
          let numapostas = 0;
          snapshot.docs.forEach((doc) => {
            let aposta = { ...doc.data(), id: doc.id };
            if (
              aposta.id != "quO8YsEEnTcQntegLK4ZZggZYsm2" &&
              aposta.id != "UFIKikDGUiQZiVi59fz4pwkPLtP2"
            ) {
              numapostas++;

              aposta.mataMata.forEach((fase) => {
                //console.log(fase.fase);
                let temBrasil = false;
                fase.jogos.forEach((jogo) => {
                  let homeIndex = estatistica.findIndex(
                    (linha) => linha.selecao === jogo.homeTeam
                  );
                  let awayIndex = estatistica.findIndex(
                    (linha2) => linha2.selecao === jogo.awayTeam
                  );
                  /*  console.log(jogo.homeTeam)
                   console.log(estatistica[homeIndex][fase.fase])
                   console.log(jogo.awayTeam)
                   console.log(estatistica[awayIndex][fase.fase]) */
                  estatistica[homeIndex][fase.fase]++;
                  estatistica[awayIndex][fase.fase]++;
                  if (fase.fase === "Oitavas") {
                    if (
                      jogo.homeTeam === "Brasil" ||
                      jogo.awayTeam === "Brasil"
                    ) {
                      temBrasil = true;
                    }
                  }
                  if (fase.fase === "Final") {
                    if (jogo.winner === "home") {
                      estatistica[homeIndex]["Campeao"]++;
                    } else {
                      estatistica[awayIndex]["Campeao"]++;
                    }
                  }
                  //console.log(jogo.homeTeam);
                  //console.log(jogo.awayTeam);
                });
                if (fase.fase === "Oitavas") {
                  if (!temBrasil) {
                    console.log("nao tem br");
                    console.log(aposta);
                  }
                }
              });
            }

            estatistica.sort(function (a, b) {
              if (b.Campeao - a.Campeao !== 0) {
                return b.Campeao - a.Campeao;
              } else {
                if (b.Final - a.Final !== 0) {
                  return b.Final - a.Final;
                } else {
                  if (b.Semifinais - a.Semifinais !== 0) {
                    return b.Semifinais - a.Semifinais;
                  } else {
                    if (b.Quartas - a.Quartas !== 0) {
                      return b.Quartas - a.Quartas;
                    } else {
                      return b.Oitavas - a.Oitavas;
                    }
                  }
                }
              }
            });

            //console.log(estatistica);
          });
          this.setEstatistica(estatistica);
          console.log(numapostas);
          console.log(JSON.stringify(estatistica));
          //  console.log(usuarios.value);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    retira_acentos(str) {
      let com_acento =
        "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
      let sem_acento =
        "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr".toLocaleLowerCase();
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
    },
  },
});
