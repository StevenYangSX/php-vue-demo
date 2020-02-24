require("./bootstrap");

import moment from "moment";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Index from "./Index";
import router from "./routes";
import FatalError from "./shared/components/FatalError";
import StarRating from "./shared/components/StarRating";
import Login from "./auth/Login";

import storeDefinition from "./store";

window.Vue = require("vue");
Vue.use(VueRouter);
Vue.use(Vuex);

Vue.filter("fromNow", value => moment(value).fromNow());

Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);
Vue.component("login", Login);

const store = new Vuex.Store(storeDefinition);

const app = new Vue({
    el: "#app",
    router,
    store,
    components: {
        index: Index
    },
    beforeCreate() {
        this.$store.dispatch("loadStoredState");
    }
});
