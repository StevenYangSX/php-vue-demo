<template>
    <div class="row">
        <div class="col-md-8 pb-4">
            <div class="card">
                <div class="card-body">
                    <div v-if="!loading">
                        <h2>{{ bookable.title }}</h2>
                        <hr />
                        <article>{{ bookable.description }}</article>
                    </div>
                    <div v-else>Loading...</div>
                </div>
            </div>

            <ReviewList :bookable-id="this.$route.params.id"></ReviewList>
        </div>
        <div class="col-md-4 pb-4">
            <Availability
                :bookable-id="this.$route.params.id"
                @availability="checkPrice($event)"
                class="mb-4"
            ></Availability>
            <Price v-if="price" :price="price" class="mb-4"></Price>
            <button
                class="btn btn-outline-secondary btn-block"
                v-if="price"
                @click="addToBasket"
                :disabled="inBasket"
            >
                Book Now
            </button>

            <button
                class="btn btn-outline-secondary btn-block"
                v-if="inBasket"
                @click="removeFromBasket"
            >
                Remove
            </button>

            <div v-if="inBasket" class="mt-4 text-muted warning">
                已经添加过此民宿
            </div>
        </div>
    </div>
</template>

<script>
import Availability from "./Availability";
import ReviewList from "./ReviewList";
import Price from "./Price";

import { mapState } from "vuex";
export default {
    components: {
        Availability,
        ReviewList,
        Price
    },
    data() {
        return {
            bookable: null,
            loading: false,
            price: null
        };
    },
    async created() {
        this.loading = true;
        //console.log(this.$route.params.id);
        const res = await axios.get(`/api/bookables/${this.$route.params.id}`);
        this.bookable = res.data.data;
        this.loading = false;
        //axios.get(`/api`)
    },

    computed: {
        ...mapState({
            lastSearch: "lastSearch"
        }),
        inBasket() {
            if (null === this.bookable) {
                return false;
            }
            return this.$store.getters.inBasket(this.bookable.id);
        }
    },

    methods: {
        async checkPrice(hasAvailability) {
            if (!hasAvailability) {
                this.price = null;
                console.log("Code got if block and price is ====>>>");
                return;
            }
            try {
                this.price = (
                    await axios.get(
                        `/api/bookables/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`
                    )
                ).data.data;
                console.log(
                    "Code got try block and price is ====>>>",
                    this.price
                );
            } catch (err) {
                console.log("Code got catch block and price is ====>>>");
                this.price = null;
            }
        },

        //basket methods
        addToBasket() {
            this.$store.dispatch("addToBasket", {
                bookable: this.bookable,
                price: this.price,
                dates: this.lastSearch
            });
        },
        removeFromBasket() {
            this.$store.dispatch("removeFromBasket", this.bookable.id);
        }
    }
};
</script>

<style scoped>
.warning {
    font-size: 0.8rem;
}
</style>
