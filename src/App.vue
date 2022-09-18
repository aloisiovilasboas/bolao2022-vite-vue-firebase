
<template>

  <div>
    <Toolbar >
    <template #start>
        <i class="pi pi-bars p-toolbar-separator mr-2" @click="visibleLeft = true"  />
    </template>
</Toolbar>
  
  <Sidebar v-model:visible="visibleLeft">

    <nav>
      <router-link to="/"> Home </router-link> |
      <router-link to="/perfil"> Perfil </router-link> |
      <router-link to="/register"> Register </router-link> |
      <router-link to="/sign-in"> Login </router-link> 


      <button @click="handleSignOut" v-if="isLoggedIn" >Sign out</button>
    </nav>
  </Sidebar>
  
    
  <router-view/>
  
</div>
</template>

<script setup>

import Toolbar from 'primevue/toolbar';

import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import router from "./router";
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';

 let visibleLeft = ref(false);
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
  .p-button,
  .p-splitbutton {
      margin-bottom: 0.5rem;
  }
  
  </style>

<!-- <style scoped>
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
</style> -->
