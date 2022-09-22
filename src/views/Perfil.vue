<script setup>
import { ref } from 'vue'
import { addDoc, collection } from "firebase/firestore"; 

defineProps({
  msg: String
})

const count = ref(0)

async function teste(){
try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912
  });

  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
}

</script>

<template>

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





</template>

