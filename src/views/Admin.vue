  <template>
    <div >
        <DataTable :value=store.usuarios >
            <Column field="nome" header="nome"></Column>
            <Column field="email" header="email">
                  <template #body="slotProps">
                    {{slotProps.data.email}}
                  </template>
              </Column>
            <Column field="id" header="linkCadastro">
                  <template #body="slotProps">
                    {{"http://127.0.0.1:5173/cadastro/"+slotProps.data.id}}
                  </template>
              </Column>
              <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteUsuario(slotProps.data)" />
                    </template>
                </Column>
        </DataTable>
    </div> 
    <Dialog v-model:visible="deleteUsuarioDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>Tem certeza que deseja excluir o usuário <b>{{uDelete.nome}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteUsuarioDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteUsuario" />
            </template>
        </Dialog>
    <div>
      <h1> Cadastrar Participante</h1>
    </div>

    <div> 
      <InputText  type="text" v-model="nameInput" placeholder="Nome" />
     
    </div>
      
    <div>
      <h2></h2>
    </div>
    <Button icon="pi pi-check" label="Cadastrar" @click="cadastraPlayer" />
      <!-- <button @click ="cadastraPlayer">Cadastrar</button> -->
    <div></div>
    <div v-if="cadastroRealizado">
      
      
    <!--  <a href="http://127.0.0.1:5173/users/asdasd"> http://127.0.0.1:5173/users/{{linkCadastro}}</a> -->
    </div>

    <!-- <button @click ="handleFetchUsers">handleFetchUsers</button> -->


</template>

<script setup>

  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import { ref  } from 'vue'
  import { useUsuariosStore } from "../stores/usuarios"
           
      const store = useUsuariosStore();
      const cadastroRealizado = ref(false);
      const products = ref();
      const nameInput = ref("");
      const deleteUsuarioDialog = ref(false);
      const uDelete =ref({});
          
           
      
      const confirmDeleteUsuario = (u) => {
            uDelete.value = u;
            deleteUsuarioDialog.value = true;
        };

      const deleteUsuario = () => {
          console.log('deleteUsuario')
          store.deleteUsuario(uDelete.value) 
          deleteUsuarioDialog.value = false
          
          
           /*  products.value = products.value.filter(val => val.id !== product.value.id);
            deleteProductDialog.value = false;
            product.value = {};
            toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000}); */
       };
       
      const cadastraPlayer = () => {
        store.cadastraPlayer({nome: nameInput.value, email: 'nao cadastrado'}) 
      } 
      const handleFetchUsers = () => {
        store.fetchUsuarios()
      }
  

  </script>
  
  
  