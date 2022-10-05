import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { inicializarFirebase, auth, db, fs } from "../services/firebase";

import { collection, doc, getFirestore, limit, orderBy, query } from 'firebase/firestore'
import { useFirestore } from '@vueuse/firebase/useFirestore'

const usuarios = useFirestore(collection(db, 'usuarios'))

export const useUserStore = defineStore ("user" , () => {
    const user = ref({
        name: "aloisio",
        email: "aloisiovilasboas@gmail.com",
    });

    const website = computed(() => user.value.email.substring(user.value.email.lastIndexOf("@") +1 ));

    const changeName = ( newname) => {
        user.value.name = newname;
    }

/* 
    if (localStorage.getItem("user")){
        user.value = JSON.parse(localStorage.getItem("user"));
    }
      
    watch(
        user, (userVal) => {
            localStorage.setItem("user", JSON.stringify(userVal));
        },
        {deep: true}
    );
 */
    return {
        user,
        website,
        changeName
    }
});
