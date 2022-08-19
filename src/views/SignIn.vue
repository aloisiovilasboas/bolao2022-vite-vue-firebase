<template>
    <h1>Entre</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Senha" v-model="password" /></p>
    <p v-if="errMsg">{{errMsg}}</p>
    <p><button @click="register">Entrar</button></p>
    <p><button @click="signInWithGoogle">Entrar com o google</button></p>
</template>

<script setup>

import {ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref() // ERROR MESSSAGE
const router = useRouter()

const register = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        console.log("Logado com Sucesso")
        router.push('/perfil')
    }).catch((error) => {
        console.log(error.code);
        switch (error.code) {
            case "auth/invalid-email":
                errMsg.value = "Email inválido";
                break;
            case "auth/user-not-found":
                errMsg.value = "Não foi encontrada nenhuma conta com esse email";
                break;
            case "auth/wrong-password":
                errMsg.value = "Senha incorreta";
                break;
            case "auth/user-disabled":
                errMsg.value = "Usuário desabilitado";
                break;
            default:
                errMsg.value = "Não foi possivel fazer o login";
                break;
        }
    })
};
const signInWithGoogle = () => {

}

</script>