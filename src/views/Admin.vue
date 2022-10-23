<script>

  import { ref, onMounted, onBeforeMount  } from 'vue'
  import { addDoc, collection,  getDoc } from "firebase/firestore"; 
  import { db } from "../services/firebase"
  import { useUserStore } from "../stores/user"
  
  
  export default {

    /* defineProps({
        msg: String
      }) */
    
    setup () {
      
      
      //store.user.name
      //store.user.email = 'asdasd@asdas'
      //store.website
      //store.changeName ('jose')
      //const playersFetched = ref(false);
      //const count = ref(0)
      //const emailInput = ref("")

      
      const store = useUserStore();
      const cadastroRealizado = ref(false);
      const products = ref();
      const nameInput = ref("")
      const emailInput = ref("")
      
      

      const handleFetchUsers = () =>{        
        store.fetchUsuarios();
        
         
      }
/* 
      const handleSubmit = () =>{
        store.changeName(nameInput.value);
        nameInput.value="";
      } */
      
      function log() {
          console.log(store.user.name+ " " +store.user.email+ " " +store.website+" "+1912 );
      }

       async function cadastraPlayer2(){
        store.cadastraPlayer({nomePreCadastro: nameInput.value, email: emailInput.value}) 
      } 

      /* async function cadastraPlayer(){
        try {
          const docRef = await addDoc(collection(db, "usuarios"), {
            nomePreCadastro: nameInput.value,
            email: emailInput.value
          });
          console.log(docRef);
          console.log("Document written with ID: ", docRef.id);
          store.usuarios.push({nomePreCadastro: nameInput.value, email: emailInput.value, id: docRef.id })
          
          cadastroRealizado.value = true
          // linkCadastro.value = docRef.id
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } */
     /*  async function teste(){
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
 */
      onBeforeMount(() => {
        handleFetchUsers()
      })

      onMounted(() => {

         let d = {
          "data": [
            {"id": "1000","code": "f230fh0g3","name": "Bamboo Watch","description": "Product Description","image": "bamboo-watch.jpg","price": 65,"category": "Accessories","quantity": 24,"inventoryStatus": "INSTOCK","rating": 5},
            {"id": "1001","code": "nvklal433","name": "Black Watch","description": "Product Description","image": "black-watch.jpg","price": 72,"category": "Accessories","quantity": 61,"inventoryStatus": "INSTOCK","rating": 4},
            {"id": "1002","code": "zz21cz3c1","name": "Blue Band","description": "Product Description","image": "blue-band.jpg","price": 79,"category": "Fitness","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 3},
            {"id": "1003","code": "244wgerg2","name": "Blue T-Shirt","description": "Product Description","image": "blue-t-shirt.jpg","price": 29,"category": "Clothing","quantity": 25,"inventoryStatus": "INSTOCK","rating": 5},
            {"id": "1004","code": "h456wer53","name": "Bracelet","description": "Product Description","image": "bracelet.jpg","price": 15,"category": "Accessories","quantity": 73,"inventoryStatus": "INSTOCK","rating": 4},
            {"id": "1005","code": "av2231fwg","name": "Brown Purse","description": "Product Description","image": "brown-purse.jpg","price": 120,"category": "Accessories","quantity": 0,"inventoryStatus": "OUTOFSTOCK","rating": 4},
            {"id": "1006","code": "bib36pfvm","name": "Chakra Bracelet","description": "Product Description","image": "chakra-bracelet.jpg","price": 32,"category": "Accessories","quantity": 5,"inventoryStatus": "LOWSTOCK","rating": 3},
            {"id": "1007","code": "mbvjkgip5","name": "Galaxy Earrings","description": "Product Description","image": "galaxy-earrings.jpg","price": 34,"category": "Accessories","quantity": 23,"inventoryStatus": "INSTOCK","rating": 5},
            {"id": "1008","code": "vbb124btr","name": "Game Controller","description": "Product Description","image": "game-controller.jpg","price": 99,"category": "Electronics","quantity": 2,"inventoryStatus": "LOWSTOCK","rating": 4},
            {"id": "1009","code": "cm230f032","name": "Gaming Set","description": "Product Description","image": "gaming-set.jpg","price": 299,"category": "Electronics","quantity": 63,"inventoryStatus": "INSTOCK","rating": 3}
          ]
        }
        // productService.value.getProductsSmall().then(data => products.value = data);
        products.value =d.data 
        console.log( 'products.vaule: '+products.value)
        //handleFetchUsers()
      })
      return { products, nameInput, emailInput, cadastroRealizado, cadastraPlayer2, handleFetchUsers, store }
    }
  }

  </script>
  
  <template>

   <!-- <div>
        <DataTable :value="products" >
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
        </DataTable>
	</div> -->
  <div >
      <DataTable :value=store.usuarios >
         <!--  <Column field="email" header="email"></Column> -->
          <Column field="nomePreCadastro" header="nome"></Column>
          <Column field="email" header="email">
                <template #body="slotProps">
                  {{slotProps.data.email}}
                </template>
            </Column>
            
          <!-- <Column field="linkCadastro" header="linkCadastro"></Column>
           -->
           <Column field="id" header="linkCadastro">
                <template #body="slotProps">
                  {{"http://127.0.0.1:5173/users/"+slotProps.data.id}}
                </template>
            </Column>
      </DataTable>
  </div> 
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
  <div> 
    <input
      type="text"
      placeholder="Email"
      v-model ="emailInput"
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
    <button @click ="cadastraPlayer2">Cadastrar</button>
  <div></div>
  <div v-if="cadastroRealizado">
    
    
   <!--  <a href="http://127.0.0.1:5173/users/asdasd"> http://127.0.0.1:5173/users/{{linkCadastro}}</a> -->
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
  
  