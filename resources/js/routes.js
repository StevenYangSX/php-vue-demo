//define routes
import Bookables from "./bookables/Bookables";
import Bookable from "./bookable/Bookable";
import VueRouter from "vue-router";
import Review from "./review/Review";
import Basket from "./basket/Basket";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

const routes = [
    {
        path: "/",
        component: Bookables,
        name: "home"
    },
    {
        path: "/bookable/:id",
        component: Bookable,
        name: "bookable"
    },
    {
        path: "/review/:id",
        component: Review,
        name: "review"
    },
    {
        path: "/basket",
        component: Basket,
        name: "basket"
    },
    {
        path: "/login",
        component: Login,
        name: "login"
    },
    {
        path: "/signup",
        component: Signup,
        name: "signup"
    }
];

const router = new VueRouter({
    routes: routes,
    mode: "history"
});

export default router;
