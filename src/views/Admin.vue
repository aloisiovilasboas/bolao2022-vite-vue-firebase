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
      
      
           
      const store = useUserStore();
      const cadastroRealizado = ref(false);
      const products = ref();
      const nameInput = ref("")
      const emailInput = ref("")
           

      async function cadastraPlayer2(){
        store.cadastraPlayer({nomePreCadastro: nameInput.value, email: 'nao cadastrado'}) 
      } 

      
      return { products, nameInput, cadastroRealizado, cadastraPlayer2, store }
    }
  }

  </script>
  
  <template>

   
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
  
                <div> 
                  <input
                    type="text"
                    placeholder="Nome"
                    v-model ="nameInput"
                  >
                </div>
                  
                <div>
                  <h2></h2>
                </div>
                  <button @click ="cadastraPlayer2">Cadastrar</button>
                <div></div>
                <div v-if="cadastroRealizado">
                  
                  
                <!--  <a href="http://127.0.0.1:5173/users/asdasd"> http://127.0.0.1:5173/users/{{linkCadastro}}</a> -->
                </div>

                <!-- <button @click ="handleFetchUsers">handleFetchUsers</button> -->
   
  
  </template>
  
  