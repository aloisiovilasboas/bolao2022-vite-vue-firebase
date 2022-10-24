

<template>
    
    <div >
        
        
        
  <Card class="inscricao" >
            <template #header>
                <img src="https://cf.shopee.com.br/file/35c7f1f5f0de28f54931c406432540ba"  />
            <!--     <img src="../assets/imgs/rascunho.png"  /> -->
            </template>
            <template #title>
                Bolão do AFC - 2022
            </template>
            <!-- <template #subtitle>
                Bem vindo
            </template> -->
        <template #content>
                
        <div class="col-12">
            <!--   <Button label="Primary" class="p-button-outlined" /> -->
            <div v-if="userStore.authuser!=null">
                <Button  icon="pi pi-check" label="Cadastrar Apostas" />
            </div>
            <p></p>
            <div>
                <Button @click="irParaRegras" icon="pi pi-times" label="Regras" class="p-button-secondary" style="margin-left: .5em"  />
            </div>
            <p></p>
            <div>
                <Button @click="irParaSobre" icon="pi pi-times" label="Sobre" class="p-button-secondary" style="margin-left: .5em" />
            </div>
        </div>
                
        </template>
            <template #footer>
                <!-- <Button icon="pi pi-check" label="Save" />
                <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
        --> </template>
        </Card>
    </div>

    
    
  

  

</template>

<script setup>
  
  import Card from 'primevue/card';
  import Button from 'primevue/button';
  import Image from 'primevue/image';
  import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

  const router = useRouter();

  const userStore = useUserStore();

  const irParaRegras = () => {
    router.push("/Regras");
  }
  const irParaSobre = () => {
    router.push("/Sobre");
    }

</script>