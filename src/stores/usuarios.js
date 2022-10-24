import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { addDoc, collection,  getDocs, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db } from "../services/firebase"

export const useUsuariosStore = defineStore ("usuarios" ,{
        state: () => {
            const usuarios = ref([])
             const dominio = ref("http://127.0.0.1:5173/#/cadastro/")
            /* const dominio = ref("https://bolaoafc2022.firebaseapp.com/#/cadastro/") */
            const fetchUsuarios = () => {
                const colRef = collection(db, 'usuarios')
                getDocs(colRef)
                .then((snapshot) => {
                    usuarios.value = []
                    snapshot.docs.forEach((doc) => {
                        usuarios.value.push({...doc.data(), id: doc.id, link: dominio.value+doc.id})
                    })
                }).catch( err=> {
                    console.log(err.message)
                })
            }
            return {
                usuarios,
                fetchUsuarios,
                dominio
            }
        },
        actions:{
            async cadastraPlayer(u){
                try {
                  const docRef = await addDoc(collection(db, "usuarios"), {
                    nome: u.nome,
                    email: u.email
                  });
                  console.log(docRef);
                  console.log("Document written with ID: ", docRef.id);
                  this.usuarios.push({nome: u.nome, email: u.email, id: docRef.id, link: this.dominio+docRef.id })
                  // linkCadastro.value = docRef.id
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
            },

            
            async cadastraEmail(u){
                try{
                    const usuarioref = doc(db, "usuarios", this.user.id);
                     await updateDoc(usuarioref, {
                        email: u.email
                    }); 
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            },

            async deleteUsuario(u){
                console.log("delete: "+u.id+" "+u.nome)
                try{
                    //const usuarioref = doc(db, "usuarios", this.user.id);
                    await deleteDoc(doc(db, "usuarios", u.id))
                    console.log("usuario excluido");
                    this.usuarios = this.usuarios.filter(val => val.id !== u.id);
                    
                } catch (e) {
                    console.error("erro ao excluir usuario: ", e);
                }
            },        
        }
    });

