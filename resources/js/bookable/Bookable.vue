<template>
  <div class="row">
    <div class="col-md-8 pb-4">
      <div class="card">
        <div class="card-body">
          <div v-if="!loading">
            <h2>{{bookable.title}}</h2>
            <hr />
            <article>{{bookable.description}}</article>
          </div>
          <div v-else>Loading...</div>
        </div>
      </div>

      <ReviewList :bookable-id="this.$route.params.id"></ReviewList>
    </div>
    <div class="col-md-4 pb-4">
      <Availability :bookable-id="this.$route.params.id"></Availability>
    </div>
  </div>
</template>


<script>
import Availability from "./Availability";
import ReviewList from "./ReviewList";

export default {
  components: {
    Availability,
    ReviewList
  },
  data() {
    return {
      bookable: null,
      loading: false
    };
  },
  async created() {
    this.loading = true;
    //console.log(this.$route.params.id);
    const res = await axios.get(`/api/bookables/${this.$route.params.id}`);
    this.bookable = res.data.data;
    this.loading = false;
    //axios.get(`/api`)
  }
};
</script>