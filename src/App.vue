
    <template>
        
        <div class="cssrouterview">
          <div v-if="loadingstore.loading"><h3>Carregando...</h3> <ProgressSpinner /></div>
          <router-view v-else/>  
        </div>    
        <div class="cssmenu">
          <Toolbar  fixed class="barra">
            <template #start>
              <Button icon="pi pi-bars" class="p-button-rounded p-button-Primary p-button-text"  @click="visibleLeft = true" /><h4> Bolão do AFC 2022</h4>
            </template>
          </Toolbar>      
          <div class="card">
            <Sidebar v-model:visible="visibleLeft">
              <div class="card">
                <div class="card-container yellow-container">
                  <router-link to="/" @click.native="InlineButtonClickHandler"> <Button label="Home" class="p-button-text button-sidebar" icon="pi pi-check"/> </router-link>
                  <!--  <router-link to="/perfil"> <Button label="Perfil" class="p-button-text button-sidebar" icon="pi pi-check" v-if="isLoggedIn"/> </router-link>   -->
                  <!-- <router-link to="/register"> <Button label="Register" class="p-button-text button-sidebar" icon="pi pi-check" v-if="!isLoggedIn"/> </router-link>   -->
                  <router-link to="/sign-in" @click.native="InlineButtonClickHandler"> <Button label="Login" class="p-button-text button-sidebar" icon="pi pi-check" v-if="!isLoggedIn"/> </router-link> 
                  <router-link to="/regras" @click.native="InlineButtonClickHandler"> <Button label="Regras" class="p-button-text button-sidebar" icon="pi pi-check"/> </router-link> 
                  <router-link to="/sobre" @click.native="InlineButtonClickHandler"> <Button label="Sobre" class="p-button-text button-sidebar" icon="pi pi-check"/> </router-link> 
                  <router-link to="/admin" @click.native="InlineButtonClickHandler"> <Button label="Admin" class="p-button-text button-sidebar" icon="pi pi-check" v-if="isLoggedIn" /> </router-link> 
                  <Button label="Sair" class="p-button-text button-sidebar" icon="pi pi-check" @click="handleSignOut" v-if="isLoggedIn" />  
                </div>
              </div>
            </Sidebar>   
          </div>
        </div>
    </template>

    <script setup>

    import ProgressSpinner from 'primevue/progressspinner';

    import Toolbar from 'primevue/toolbar';

    import { onMounted, ref } from "vue";
    import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
    import { useUserStore } from "./stores/user"
    import { useLoadingStore } from "./stores/loading"
    import router from "./router";
    import Sidebar from 'primevue/sidebar';
    import Button from 'primevue/button';

    const visibleLeft = ref(false);
    const isLoggedIn = ref(false);
    const loading = ref(false);
    //const store = useUserStore();
    const loadingstore = useLoadingStore();

    const InlineButtonClickHandler = () =>{
      visibleLeft.value=!visibleLeft.value
    }

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
        visibleLeft.value=!visibleLeft.value
      });
    };

    </script>

    <style>
      .app {
        width: 100%;
      }

      .button-sidebar {
        width: 100%;
      }
      .routerview{
        width: 100%;
      }
      .cssmenu {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
      }
      
    </style>
