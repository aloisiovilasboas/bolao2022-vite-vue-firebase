import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { addDoc, collection,  getDocs, getDoc, doc } from "firebase/firestore"; 
import { db } from "../services/firebase"

//import { inicializarFirebase, auth, db, fs } from "../services/firebase";

//import { collection, doc, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore'
//import { useFirestore } from '@vueuse/firebase/useFirestore'



// import { db } from "../services/firebase"

// const usuarios = useFirestore(collection(db, 'usuarios'))

export const useUserStore = defineStore ("user" ,{
        state: () => {
            const usuarios = ref([])
            const idCadastro = ''
            const user = ref({
                id:'nulo',
                name: "nome",
                email: "email",
                nomePreCadastro: "nan",
                nome: ""
            });

        //    const website = computed(() => user.value.email.substring(user.value.email.lastIndexOf("@") +1 ));

            const changeId = (newid) => {
                user.value.id = newid;
            }
            /*
            const changeName = ( newname) => {
                user.value.name = newname;
            } */

            

            const fetchUsuarios = () => {
                const colRef = collection(db, 'usuarios')
                getDocs(colRef)
                .then((snapshot) => {
                    usuarios.value = []
                    snapshot.docs.forEach((doc) => {
                        usuarios.value.push({...doc.data(), id: doc.id})
                    })
                }).catch( err=> {
                    console.log(err.message)
                })
            }
        /* 
            if (localStorage.getItem("user")){
                user.value = JSON.parse(localStorage.getItem("user"));
            }
            
            watch(
                user, (userVal) => {
                    localStorage.setItem("user", JSON.stringify(userVal));
                },
                {deep: true}
            );
        */
            return {
                user,
                //website,
               // changeName,
                changeId,
                usuarios,
                fetchUsuarios
            }
        },
        actions:{
            async cadastraPlayer(u){
                try {
                  const docRef = await addDoc(collection(db, "usuarios"), {
                    nomePreCadastro: u.nomePreCadastro,
                    email: u.email
                  });
                  console.log(docRef);
                  console.log("Document written with ID: ", docRef.id);
                  this.usuarios.push({nomePreCadastro: u.nomePreCadastro, email: u.email, id: docRef.id })
                  // linkCadastro.value = docRef.id
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
            },
            async fetchUsuarioById(id){
                const docRef = doc(db, "usuarios", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    this.user.email = docSnap.data().email
                    this.user.nomePreCadastro = docSnap.data().nomePreCadastro
                    this.user.id = id
                    return true
                  } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    return false
                  }
            }
        }
    });

