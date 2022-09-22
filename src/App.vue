
<template>
<div class="cssmenu">
  <Toolbar  fixed>
    <template #start>
      <Button icon="pi pi-bars" class="p-button-rounded p-button-Primary p-button-text"  @click="visibleLeft = true" /><h4> Bolão do AFC 2022</h4>
    </template>
</Toolbar>
</div>




<div class="card">
  <Sidebar v-model:visible="visibleLeft">
    <div class="card">
    <div class="card-container yellow-container">
      <router-link to="/"> <Button label="Home" class="p-button-text button-sidebar" icon="pi pi-check"/> </router-link>
      <router-link to="/perfil"> <Button label="Perfil" class="p-button-text button-sidebar" icon="pi pi-check"/> </router-link> 
      <router-link to="/register"> <Button label="Register" class="p-button-text button-sidebar" icon="pi pi-check"/> </router-link> 
      <router-link to="/sign-in"> <Button label="Login" class="p-button-text button-sidebar" icon="pi pi-check"/> </router-link> 
      <router-link to="/testedb"> <Button label="Teste DB" class="p-button-text button-sidebar" icon="pi pi-check"/> </router-link> 
      <Button label="Sair" class="p-button-text button-sidebar" icon="pi pi-check" @click="handleSignOut" v-if="isLoggedIn" />  
    </div>
</div>
</Sidebar>
  
    
  <router-view/>
  
</div>
</template>

<script setup>

import Toolbar from 'primevue/toolbar';
import Dock from 'primevue/dock';

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

<style>
  .button-sidebar {
    width: 100%;
  }
  .cssmenu {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
  }
</style>

<style lang="scss" scoped>
  .p-button {
      margin-right: .5rem;
  }
  
  .p-buttonset {
      .p-button {
          margin-right: 0;
      }
  }
  
  .sizes {
      .button {
          margin-bottom: .5rem;
          display: block;
  
          &:last-child {
              margin-bottom: 0;
          }
      }
  }
  
  @media screen and (max-width: 640px) {
      .p-button {
          margin-bottom: .5rem;
  
          &:not(.p-button-icon-only) {
              display: flex;
              width: 100%;
          }
      }
  
      .p-buttonset {
          .p-button {
              margin-bottom: 0;
          }
      }
  }
  </style>
  
