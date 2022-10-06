<script setup>
    import { ref, onMounted  } from 'vue'
    import { addDoc, collection,  getDoc } from "firebase/firestore"; 
    import { db } from "../services/firebase"

    import DataTable from 'primevue/dataTable';
    import Column from 'primevue/column';
    
    
    import { useUserStore } from "../stores/user";
    
    defineProps({
      msg: String
    })

    
    
    const store = useUserStore();
    



    
    
    //store.user.name
    //store.user.email = 'asdasd@asdas'
    //store.website
    //store.changeName ('jose')

    const cadastroRealizado = ref(false);
    const playersFetched = ref(false);

    const usuarios = ref([]);
    const linkCadastro = ref("")
    const count = ref(0)
    const nameInput = ref("")
    const emailInput = ref("")

    const handleFetchUsers = () =>{
      store.fetchUsuarios();
      
      usuarios.value = store.usuarios.lista
      console.log(usuarios.value)
      playersFetched.value=true
      

    }

    const handleSubmit = () =>{
      store.changeName(nameInput.value);
      nameInput.value="";
    }
    
function log() {
console.log(store.user.name+ " " +store.user.email+ " " +store.website+" "+1912 );
}

    async function cadastraPlayer(){
      try {
        const docRef = await addDoc(collection(db, "usuarios"), {
          nome: nameInput.value,
          email: '-'
        });
        console.log(docRef);
        console.log("Document written with ID: ", docRef.id);
        cadastroRealizado.value = true
        linkCadastro.value = docRef.id
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    async function teste(){
      try {
        const docRef = await addDoc(collection(db, "users"), {
          first: store.user.name,
          middle: store.user.email,
          last: store.website,
          born: 1912
        });
        console.log(docRef);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    onMounted(() => {
      handleFetchUsers()
    })
    
    
  
  


    </script>
    
    <template>
 
        <template>
            <div v-if="playersFetched">
                <DataTable :value=usuarios responsiveLayout="scroll">
                    <Column field="nome" header="Code"></Column>
                    <Column field="email" header="Name"></Column>
                    
                </DataTable>
            </div>
        </template>



    <div>
      <h1> Cadastrar Participante</h1>
    </div>
   <!--  <div>
      <h2> Name is {{ store.user.email }}</h2>
    </div>
      <h2> Name is {{ store.website }} </h2>
    -->
      <div> 
      <input
       type="text"
       placeholder="Nome"
       v-model ="nameInput"
      >
    </div>
    <!-- <div>
      <input
       type="text"
       placeholder="Email"
       v-model ="emailInput"
      >
    </div> -->
    <div>
      <h2></h2>
    </div>
      <button @click ="cadastraPlayer">Cadastrar</button>
    <div></div>
    <div v-if="cadastroRealizado">
      <h2> Link: </h2>
      
      <a href="http://127.0.0.1:5173/users/asdasd"> http://127.0.0.1:5173/users/{{linkCadastro}}</a>
    </div>

    <button @click ="handleFetchUsers">handleFetchUsers</button>
    
      
   <!--    <button @click ="handleSubmit">muda nome</button>
      <button @click ="teste">teste</button>
      <button @click ="log">log</button> -->

      <!-- 
    <div class="card">
        <div class="card-container blue-container flex align-items-center justify-content-start">
            <div class="hidden w-4rem h-4rem bg-blue-500 text-white font-bold p-4 border-round mr-3">1</div>
            <div class="w-4rem h-4rem bg-blue-500 text-white font-bold flex align-items-center justify-content-center p-4 border-round mr-3">2</div>
            <div class="w-4rem h-4rem bg-blue-500 text-white font-bold flex align-items-center justify-content-center p-4 border-round">3</div>
        </div>
    </div>
    
    <div class="card">
        <div class="flex flex-wrap align-items-center justify-content-center card-container yellow-container">
            <div class="relative bg-yellow-200 w-9rem h-9rem mx-3 my-3 md:my-0 border-round">
                <div class="absolute md:top-0 md:left-0 top-50 left-50 bg-yellow-500 text-white font-bold flex align-items-center justify-content-center w-4rem h-4rem border-round">1</div>
            </div>
            <div class="relative bg-yellow-200 w-9rem h-9rem mx-3 my-3 md:my-0 border-round">
                <div class="absolute md:bottom-0 md:right-0 bottom-50 right-50 bg-yellow-500 text-white font-bold flex align-items-center justify-content-center w-4rem h-4rem border-round">2</div>
            </div>
        </div>
    </div>
    
    <h1>{{ msg }}</h1>
      <div class="card">
        <button type="button" @click="teste">count is {{ count }}</button>
        <p>
          Edit
          <code>components/HelloWorld.vue</code> to test HMR
        </p>
      </div>
      <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
    
    
     -->
    
    
    </template>
    
    