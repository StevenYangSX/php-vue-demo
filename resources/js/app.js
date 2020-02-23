/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

import router from "./routes";
import VueRouter from "vue-router";
import Index from "./Index";
import moment from "moment";
import StarRating from "./shared/components/StarRating";

import FatalError from "./shared/components/FatalError";
import Vuex from "Vuex";
import storeDefinition from './store';

window.Vue = require("vue");

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

// Vue.component('example2', require('./components/Example2.vue').default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(VueRouter);
Vue.use(Vuex);

//register filter globally
Vue.filter("fromNow", value => moment(value).fromNow());

Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);


const store = new Vuex.Store(storeDefinition);

const app = new Vue({
    el: "#app",
    router: router,
    store: store,
    components: {
        index: Index
    },
    beforeCreate() {
        this.$store.dispatch('loadStoredState');
    }
});
