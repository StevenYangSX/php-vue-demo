<template>
  <div>
    <h6 class="text-uppercase text-secondary font-weight-bolder">
      Check Availability
      <span v-if="isAvailable" class="text-success">(Available)</span>
      <span v-if="notAvailable" class="text-danger">(Not Available)</span>
    </h6>

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="from">From</label>
        <input
          type="text"
          name="from"
          class="form-control form-control-sm"
          placeholder="Start Date"
          v-model="from"
          @keyup.enter="check"
          :class="[{'is-invalid' : this.errorFor('from')}]"
        />
        <div
          class="invalid-feedback"
          v-for="(error, index) in this.errorFor('from')"
          :key="'from'+index"
        >{{error}}</div>
      </div>

      <div class="form-group col-md-6">
        <label for="to">To</label>
        <input
          type="text"
          name="to"
          class="form-control form-control-sm"
          placeholder="End Date"
          v-model="to"
          @keyup.enter="check"
          :class="[{'is-invalid' : this.errorFor('to')}]"
        />
        <div
          class="invalid-feedback"
          v-for="(error, index) in this.errorFor('to')"
          :key="'to'+index"
        >{{error}}</div>
      </div>
    </div>

    <button class="btn btn-secondary btn-block" @click="check" :disabled="loading">Check</button>
  </div>
</template>



<script>
export default {
  props: {
    bookableId: String
  },
  data() {
    return {
      from: null,
      to: null,
      loading: false,
      status: null,
      errors: null
    };
  },
  methods: {
    check() {
      //start loading.. and make previous errors null
      this.loading = true;
      this.errors = null;
      //api call
      axios
        .get(
          `/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`
        )
        .then(response => {
          this.status = response.status;
        })
        .catch(error => {
          if (422 === error.response.status) {
            this.errors = error.response.data.errors;
          }
          this.status = error.response.status;
        })
        .then(() => (this.loading = false));
    },

    errorFor(field) {
      return this.hasErrors && this.errors[field] ? this.errors[field] : null;
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