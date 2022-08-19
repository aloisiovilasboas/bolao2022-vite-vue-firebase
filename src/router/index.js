import {createRouter , createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("../views/Home.vue")},
        { 
            path: "/perfil",
            component: () => import("../views/Perfil.vue"),
            meta: {
                requiresAuth: true,
            }
        },
            
        { path: "/register", component: () => import("../views/Register.vue")},
        { path: "/sign-in", component: () => import("../views/SignIn.vue")},
        
    ],
})

const getCurrentUser = () => {
    return new Promise ((resolve, reject) => {
        const removeListener =  onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        )
    })
};

router.beforeEach(async (to, from ,next) => {
    if (to.matched.some(record => record.meta.requiresAuth)){
        if (await getCurrentUser()) {
            next();
        } else {
            alert("Você não está logado");
            next("/");

        }
    } else {
        next();
    }
});
export default router