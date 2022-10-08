<template>
    <h1>Entre {{ $route.params.id }} </h1>

    <template>
    <div>
        <DataTable :value="products" responsiveLayout="scroll">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column field="quantity" header="Quantity"></Column>
        </DataTable>
    </div>
</template>

</template>

<script setup>


    import { ref, onMounted } from 'vue'
    import { doc, getDoc } from "firebase/firestore";
    import { useUserStore } from "../stores/user";

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
        const userStore = useUserStore();
        console.log(userStore.user.id)
    })
</script>