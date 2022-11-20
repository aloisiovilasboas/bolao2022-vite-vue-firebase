import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useLoadingStore } from "../stores/loading";
import { useUsuariosStore } from "../stores/usuarios";
import { useUserStore } from "../stores/user";
import { useApostasStore } from "../stores/apostas";
import { useGabaritoStore } from "../stores/gabarito";
import { useRankingStore } from "../stores/ranking";


//Vue.component('loading',{ template: '<div>Loading!</div>'})

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      beforeEnter: async (to, from) => {
        const userStore = useUserStore();
        const u = await getCurrentUser();
        if (u != null) {
          
          userStore.setAuthUser(u);
          const apostasStore = useApostasStore();
          await apostasStore.fetchApostaById(u.uid);
        //  console.log(userStore.authuser);
        } else {
          userStore.setAuthUser(null);
        }
      },
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/cadastro/:id",
      beforeEnter: async (to, from) => {
        const userStore = useUserStore();
        let linkValido = await userStore.fetchUsuarioById(to.params.id);
      },
      component: () => import("../views/confirmarCadastro.vue"),
      meta: {
        requiresDeslogado: true,
      },
    },
    {
      path: "/jogador/:id",
      beforeEnter: async (to, from) => {
        const rankingStore = useRankingStore();
        await rankingStore.fetchRanking();
        const apostasStore = useApostasStore();
        await apostasStore.fetchApostaById(to.params.id);        
      },
      component: () => import("../views/jogador.vue"),
      /* meta: {
        requiresAuth: false,
      }, */
    },
    {
      path: "/admin",
      beforeEnter: async (to, from) => {
        const u = await getCurrentUser();
        if (u != null) {
          const userStore = useUserStore();
          userStore.setAuthUser(u);
          const usuariosStore = useUsuariosStore();
          await usuariosStore.fetchUsuarios();
          console.log("uid: " + u.uid);
          usuariosStore.getIsAdmin(u.uid);
          //                    console.log(userStore.authuser)
        } else {
          userStore.setAuthUser(null);
        }
      },
      component: () => import("../views/Admin.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/ranking",
      beforeEnter: async (to, from) => {
        const rankingStore = useRankingStore();
        await rankingStore.fetchRanking();
      },
      component: () => import("../views/Ranking.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/gabarito",
      beforeEnter: async (to, from) => {
        const u = await getCurrentUser();
        if (u != null) {
          const userStore = useUserStore();
          userStore.setAuthUser(u);
          const rankingStore = useRankingStore();
          await rankingStore.fetchRanking();
          const usuariosStore = useUsuariosStore();
          await usuariosStore.fetchUsuarios();
         // console.log("uid: " + u.uid);
          usuariosStore.getIsAdmin(u.uid);
          const gabaritoStore = useGabaritoStore();
          await gabaritoStore.fetchApostas();
          await gabaritoStore.fetchGabarito();
          //                    console.log(userStore.authuser)
        } else {
          userStore.setAuthUser(null);
        }
      },
      component: () => import("../views/Gabarito.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      beforeEnter: async (to, from) => {
        const apostasStore = useApostasStore();
      },
      path: "/cadastrarApostas",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/CadastrarApostas.vue"),
    },
    {
      path: "/vimpressao",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/vimpressao.vue"),
    },
    {
      path: "/apostasCadastradas",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/apostasCadastradas.vue"),
    },
    { path: "/sign-in", component: () => import("../views/SignIn.vue") },
    { path: "/Regras", component: () => import("../views/Regras.vue") },
    { path: "/Sobre", component: () => import("../views/Sobre.vue") },
    {
      
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import("../views/naoEncontrado.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
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

router.beforeEach(async (to, from, next) => {
  const loadingStore = useLoadingStore();
  loadingStore.loading = true;
  // console.log(loadingStore.loading)
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log('requiresauth');
    const u = await getCurrentUser();
    if (u) {
      const apostasStore = useApostasStore();
      await apostasStore.fetchApostaById(u.uid);
      const userStore = useUserStore();
      userStore.setAuthUser(u);
      next();
    } else {
      alert("Você não está logado");
      next("/");
    }
  } else if (to.matched.some((record) => record.meta.requiresDeslogado)) {
    if (await getCurrentUser()) {
      alert("Você já está logado");
      next("/");
    } else {
      next();
    }
  } /*  else if (to.matched.some(record => record.meta.admin)) {
        if (await getCurrentUser()) {
            if (await getIsUserAdmin()){
                alert('admin');
                next();
            }else {
                next("/");
            }
        } else {
            next("/");
        }
    }  */ else {
    next();
  }
});

router.afterEach(() => {
  const loadingStore = useLoadingStore();
  loadingStore.loading = false;
});

export default router;
