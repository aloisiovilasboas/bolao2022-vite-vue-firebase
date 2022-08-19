
<template>
  
    <nav>
      <router-link to="/"> Home </router-link> |
      <router-link to="/perfil"> Perfil </router-link> |
      <router-link to="/register"> Register </router-link> |
      <router-link to="/sign-in"> Login </router-link> 
      <button @click="handleSignOut" v-if="isLoggedIn" >Sign out</button>
    </nav>
    <router-view/>
  
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import router from "./router";

const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});


const handleSignOut = () =>{
  signOut(auth).then(()=>{
    router.push("/");
  });

};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
