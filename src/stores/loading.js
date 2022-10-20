import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const loadingStateStore = defineStore ("loadingState" ,{
    state: () => {
        
        const loading = ref(false)
        
        const setLoading = (newvalue) => {
            loading.value = newvalue;
        }
        return {
            loading,
            setLoading
        }
    }
});
