

<template>
  <Card style="width: 25em">
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
                <p>Para participar do Bolão do AFC 2022, entre em contato com algum membro da organização. Em seguida, clique no link fornecido pela organização e realize o seu cadastro. Atenção, o link é individual e intransferível e funciona para um único cadastro. Preencha os dados das suas apostas e submeta os seus palpites até as 12h do dia 14 de junho de 2018, quando será dado o pontapé inicial da Copa do Mundo FIFA 2018. Lembre que para garantir a sua inscrição, é preciso também, até a mesma data e horário, confirmar o pagamento da sua cota de R$25,00 a um dos organizadores. Não serão aceitos palpites submetidos após o prazo. Depois disso, é só aguardar os resultados dos jogos e torcer pelas seleções que você apostou.</p>
                <p>Deseja se inscrever no bolão?</p>
                
            </template>
            <template #footer>
                <Button icon="pi pi-check" label="Save" />
                <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
            </template>
        </Card>

  

  

</template>

<script setup>
  
  import Card from 'primevue/card';
  import Button from 'primevue/button';
  import Image from 'primevue/image';

</script>