import {createRouter , createWebHistory, createWebHashHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useLoadingStore} from "../stores/loading"
import { useUsuariosStore } from "../stores/usuarios";
import { useUserStore } from "../stores/user";

//Vue.component('loading',{ template: '<div>Loading!</div>'})


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/",
        beforeEnter: async (to, from) => {
            const userStore = useUserStore();
            const u = await getCurrentUser()
            if (u!=null){
                userStore.setAuthUser(u)
                console.log(userStore.authuser)
            } else {
                userStore.setAuthUser(null)
            }
            // const usuariosStore =useUsuariosStore();
            //console.log(usuariosStore)
            // let linkValido = userStore.fetchUsuarioById(to.params.id);
            // usuariosStore.fetchUsuarios();
        },
         component: () => import("../views/Home.vue")},   
        {
            path: '/cadastro/:id',
            beforeEnter: (to, from) => {
                const userStore = useUserStore();
                let linkValido = userStore.fetchUsuarioById(to.params.id);
            },
            component: () => import("../views/confirmarCadastro.vue"),
            meta: {
                requiresDeslogado: true,
            } 
        },
        {
            path: "/admin",
            beforeEnter: (to, from) => {
                const usuariosStore =useUsuariosStore();
                console.log(usuariosStore)
                // let linkValido = userStore.fetchUsuarioById(to.params.id);
                usuariosStore.fetchUsuarios();
            },
            component: () => import("../views/Admin.vue"),
            meta: {
                requiresAuth: true,
            }
        },
        { path: "/register", component: () => import("../views/Register.vue")},
        { path: "/sign-in", component: () => import("../views/SignIn.vue")},
        { path: "/Regras", component: () => import("../views/Regras.vue")},
        { path: "/Sobre", component: () => import("../views/Sobre.vue")},
        { 
            path: "/perfil",
            beforeEnter: async (to, from) => {
                const u = await getCurrentUser()
                console.log(u)
                // const usuariosStore =useUsuariosStore();
                //console.log(usuariosStore)
                // let linkValido = userStore.fetchUsuarioById(to.params.id);
                // usuariosStore.fetchUsuarios();
            },
            component: () => import("../views/Perfil.vue"),
            meta: {
                requiresAuth: true,
            }
        },
        {
            // path: "*",
            path: "/:catchAll(.*)",
            name: "NotFound",
            component: () => import("../views/naoEncontrado.vue"),
            meta: {
              requiresAuth: false
            }
          }
        /* {
            path: "/:pathmatch(.*)*",
            name: 'naoEncontrado',
            component: () => import("../views/naoEncontrado.vue")
        } */
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
/* 
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
}; */



router.beforeEach(async (to, from ,next) => {
    const loadingStore =useLoadingStore();
    loadingStore.loading = true
    // console.log(loadingStore.loading)
    if (to.matched.some(record => record.meta.requiresAuth)){
        if (await getCurrentUser()) {
            next();
            
        } else {
            alert("Você não está logado");
            next("/");
            
        }
    } else if (to.matched.some(record => record.meta.requiresDeslogado)){
        if (await getCurrentUser()) {
            alert("Você já está logado");
            next("/");
            
        } else {
            next();
            
        }
    } else {
        next();
        
    }
});

router.afterEach(() => {
    const loadingStore =useLoadingStore();
    loadingStore.loading = false
})

export default router