

<template>
    <div >
        <div>
            <Button icon="pi pi-check" label="Cadastrar Apostas" />
            <Button icon="pi pi-times" label="Regras" class="p-button-secondary" style="margin-left: .5em" />
            <Button icon="pi pi-times" label="Sobre" class="p-button-secondary" style="margin-left: .5em" />
        </div>
        <p></p>
  <Card class="inscricao" >
            <template #header>
                <img src="https://cf.shopee.com.br/file/35c7f1f5f0de28f54931c406432540ba"  />
            <!--     <img src="../assets/imgs/rascunho.png"  /> -->
            </template>
            <template #title>
                Bolão do AFC - 2022
            </template>
            <template #subtitle>
                Bem vindo
            </template>
            <template #content>
                <p>Plis Play</p>
                <p>Deseja se inscrever no bolão?</p>
                
            </template>
            <template #footer>
                <Button icon="pi pi-check" label="Save" />
                <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
            </template>
        </Card>
    </div>
  

  

</template>

<script setup>
  
  import Card from 'primevue/card';
  import Button from 'primevue/button';
  import Image from 'primevue/image';

</script>