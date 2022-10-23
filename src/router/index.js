import {createRouter , createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import Home from '../views/Home.vue';
import { useUserStore } from "../stores/user";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("../views/Home.vue")},   
        {
            path: '/users/:id',
            beforeEnter: (to, from) => {
                let usuario = '';
                const userStore = useUserStore();
                let linkValido = userStore.fetchUsuarioById(to.params.id);
            },
            component: () => import("../views/confirmarCadastro.vue") 
        },
        { path: "/register", component: () => import("../views/Register.vue")},
        { path: "/sign-in", component: () => import("../views/SignIn.vue")},
        { path: "/Regras", component: () => import("../views/Regras.vue")},
        { path: "/Sobre", component: () => import("../views/Sobre.vue")},
        { path: "/perfil", component: () => import("../views/Perfil.vue"),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/admin",
            component: () => import("../views/Admin.vue"),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/:pathmatch(.*)*",
            name: 'naoEncontrado',
            component: () => import("../views/naoEncontrado.vue")
        }
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

const lazyLoadRoute = AsyncView => {
    const AsyncHandler = () => ({
        component: AsyncView,
        loading: Spinner
    });

    return Promise.resolve({
        functional: true,
        render(h, {data, children}) {
            // Transparently pass any props or children
            // to the view component.
            return h(AsyncHandler, data, children);
        }
    });
};


const isUserListed = () => {
    return new Promise ((resolve, reject) => {
        




        /* const removeListener =  onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        ) */
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