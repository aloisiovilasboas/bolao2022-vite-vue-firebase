<template>
  <Shoppingcart />
</template>

<script>
import { onMounted } from 'vue';
import { collection, getDocs, addDoc } from '@firebase/firestore';
import Shoppingcart from "./components/Shoppingcart.vue";
// import { useStore } from 'vuex';
import {db} from './firebase'

export default {
  name: "App",
  components: {
    Shoppingcart,
  },
  setup(){
    // const store = useStore()
    onMounted(()=>{
        /* const querysnapshot1 = getDocs( collection(db, "cart"));
        store.dispatch('cleanStore')
        querysnapshot1.forEach((doc) => {
          store.dispatch('addAllProducts',doc.data())
        }) */
    })
    return {

    }
  }
};
</script>

<style></style>