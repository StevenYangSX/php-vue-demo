<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Check Availability
            <transition name="fade">
                <span v-if="isAvailable" class="text-success">(Available)</span>
                <span v-if="notAvailable" class="text-danger"
                    >(Not Available)</span
                >
            </transition>
        </h6>

        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input
                    type="date"
                    name="from"
                    class="form-control form-control-sm"
                    placeholder="Start Date"
                    v-model="from"
                    @keyup.enter="check"
                    :class="[{ 'is-invalid': this.errorFor('from') }]"
                />
                <div
                    class="invalid-feedback"
                    v-for="(error, index) in this.errorFor('from')"
                    :key="'from' + index"
                >
                    {{ error }}
                </div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input
                    type="date"
                    name="to"
                    class="form-control form-control-sm"
                    placeholder="End Date"
                    v-model="to"
                    @keyup.enter="check"
                    :class="[{ 'is-invalid': this.errorFor('to') }]"
                />
                <div
                    class="invalid-feedback"
                    v-for="(error, index) in this.errorFor('to')"
                    :key="'to' + index"
                >
                    {{ error }}
                </div>
            </div>
        </div>
        <button
            class="btn btn-secondary btn-block"
            @click="check"
            :disabled="loading"
        >
            <span v-if="!loading">Check</span>
            <span v-if="loading"
                ><i class="fas fa-circle-notch fa-spin"></i>checking...</span
            >
        </button>

        <button class="btn btn-secondary btn-block disabled">
            Leave Review(开发中。。)
        </button>

        <router-link
            class="btn btn-secondary btn-block"
            :to="'/review/b9da51e5-52c6-4a40-bcd4-8174ff907fac'"
        >
            Leave Review(测试)
        </router-link>
        <h1>Test...</h1>
    </div>
</template>

<script>
export default {
    props: {
        bookableId: [String, Number]
    },
    data() {
        return {
            from: this.$store.state.lastSearch.from,
            to: this.$store.state.lastSearch.to,
            loading: false,
            status: null,
            errors: null
        };
    },
    methods: {
        async check() {
            //start loading.. and make previous errors null
            this.loading = true;
            this.errors = null;

            //state mutations
            this.$store.dispatch("setLastSearch", {
                from: this.from,
                to: this.to
            });
            //api call
            // try {
            //     this.status = await axios.get(
            //         `/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`
            //     ).status;

            //     this.$emit("availability", this.isAvailable);
            // } catch (error) {
            //     if (422 === error.response.status) {
            //         this.errors = error.response.data.errors;
            //     }
            //     this.status = error.response.status;
            //     this.$emit("availability", this.isAvailable);
            // }
            // this.loading = false;
            axios
                .get(
                    `/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`
                )
                .then(response => {
                    this.status = response.status;
                    this.$emit("availability", this.isAvailable);
                })
                .catch(error => {
                    if (422 === error.response.status) {
                        this.errors = error.response.data.errors;
                    }
                    this.status = error.response.status;
                    this.$emit("availability", this.isAvailable);
                })
                .then(() => (this.loading = false));
        },

        errorFor(field) {
            return this.hasErrors && this.errors[field]
                ? this.errors[field]
                : null;
        }
    },

    //computed properties
    computed: {
        hasErrors() {
            return this.status === 422 && this.errors !== null;
        },
        isAvailable() {
            return this.status === 200;
        },
        notAvailable() {
            return this.status === 404;
        }
    }
};
</script>

<style scoped>
label {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: gray;
    font-weight: bolder;
}
</style>
