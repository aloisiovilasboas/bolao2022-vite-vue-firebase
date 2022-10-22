<template>
    <div v-if="userStore.user.loading"><h3>Loading...</h3></div>
    <div v-else-if ="userStore.user.valido==false"><h1>Esse link não é válido</h1></div>
    <div v-else>
     
    <div >
  <Card class="inscricao" >
            <template #header>
                <img src="../assets/fifa_world_cup_2022_official_cartoon_poster.png" />
                
            </template>
            <template #title>
                Bem vindo, {{ userStore.user.nomePreCadastro }}
            </template>
            
            <template #subtitle>
                Conclua o cadastro para participar do bolão
            </template>
            
            <template #content>
                
        
        <div class="formularioDiv">
            
            <InputText class="formulario" id="email" type="text" v-model="emailCadastro" placeholder="E-mail" />
            <p></p>
            <Password class="formulario" v-model="senhaCadastro" toggleMask  placeholder="Senha" :feedback="false" />
            <p v-if="errMsg"></p>
            <InlineMessage class="formulario" severity="error" v-if="errMsg">{{errMsg}}</InlineMessage >
            
            
        </div>
        
            </template>
            <template #footer>
                <Button icon="pi pi-check" label="Cadastrar" @click="register" />
            </template>
        </Card>
    </div>


    
    <div class="container col-12" >

        <div class="flex flex-wrap align-items-center justify-content-center card-container yellow-container">
            
                <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-yellow-500 font-bold text-gray-900 border-round m-2">1</div>
                <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-yellow-500 font-bold text-gray-900 border-round m-2">2</div>
                <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-yellow-500 font-bold text-gray-900 border-round m-2">3</div>
            
        </div>

        <div  >
                <h5>meuovable</h5>
           
                <!-- //para o tabview v-model:activeIndex="active2"  -->
                <TabView  :scrollable="true">
                    <TabPanel v-for="tab in scrollableTabs" :key="tab.title" :header="tab.title">
                        <p>{{tab.content}}</p>
                    </TabPanel>
                </TabView>
            </div>

        
        
                <div class="card min-width">
                    <h5>Default</h5>
                    <TabView ref="tabview1">
                        <TabPanel header="Grupo A">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                laborum.
                            </p>
                        </TabPanel>
                        <TabPanel header="Grupo B">
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </TabPanel>
                        <TabPanel header="Grupo C">
                            <p>
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                                culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                            </p>
                        </TabPanel>
                    </TabView>
                </div>
        
    </div>

    <!-- <p><button @click="signInWithGoogle">Entrar com o google</button></p> -->

    </div>
</template>

<script setup>

import InlineMessage  from 'primevue/inlinemessage ';

    import InputText from 'primevue/inputtext';
    import Password from 'primevue/password';
    

    import Card from 'primevue/card';
    import Button from 'primevue/button';
    import 'primeflex/primeflex.scss';

    import TabView from 'primevue/TabView'
    import TabPanel from 'primevue/TabPanel'
    import { ref, onMounted } from 'vue'
    import { useUserStore } from "../stores/user";

        
    import { 
            getAuth,
            createUserWithEmailAndPassword,
            GoogleAuthProvider,
            signInWithPopup,
        } from "firebase/auth";
    import { useRouter } from "vue-router";

    const errMsg = ref() // ERROR MESSSAGE
    const tabs = ref([
                {
                    title: 'Header I',
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                },
                {
                    title: 'Header II',
                    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi."
                },
                {
                    title: 'Header III',
                    content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus."
                }
            ])
    const scrollableTabs = ref(
            Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` }))
        )
    
    const emailCadastro = ref("")
    const senhaCadastro = ref("")
    const nomeUsuario = ref("")
    const loading = ref(true)
    const value3 = ref("")

    const email = ref("");
    const password = ref("");
    const passwordConfirmation = ref("");
    const router = useRouter()
    const userStore = useUserStore();

    const register = () => {
        createUserWithEmailAndPassword(getAuth(), emailCadastro.value, senhaCadastro.value)
        .then((data) => {
            console.log("Registrado com Sucesso")
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
                    case "auth/weak-password":
                        errMsg.value = "A senha deve ter ao menos 6 caracteres";
                        break;
                    case "auth/email-already-in-use":
                        errMsg.value = "Esse email já está cadastrado";
                        break;
                    case "auth/user-disabled":
                        errMsg.value = "Usuário desabilitado";
                        break;
                    default:
                        errMsg.value = "Não foi possivel fazer o cadastro: "+error.code ;
                        break;
                }
            })
        };
    


    //import { defineProps, reactive } from "vue";

    /* const props = defineProps({
      id: String,
    }); */
    

    /* const docRef = doc(db, "usuarios", this.$route.params.id);
    const docSnap = await getDoc(docRef);

    

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    } */

    onMounted(() => {
        console.log(userStore.user.nomePreCadastro)
        userStore.fetchUsuarioById(userStore.user.id)
        console.log(userStore.user.nomePreCadastro)
        loading.value = false
    })
</script>
<!-- <style lang="scss" scoped>
::v-deep(.p-password input) {
    width: 15rem
}
</style> -->