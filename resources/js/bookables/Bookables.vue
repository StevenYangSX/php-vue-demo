<template>
  <div>
    <div v-if="loading">
      <p>Data is Loading...</p>
    </div>
    <div v-else>
      <div class="row mb-4" v-for="row in rows" :key="'row'+row">
        <div
          class="col d-flex align-items-stretch"
          v-for="(bookable,column) in bookablesInRow(row)"
          :key="'row'+row+column"
        >
          <BookableListItem v-bind="bookable"></BookableListItem>
        </div>
        <div class="col" v-for="p in placeholdersInRow(row)" :key="'place'+row + p"></div>
      </div>
    </div>
  </div>
</template>



<script>
import BookableListItem from "./BookableListItem";

export default {
  components: {
    BookableListItem
  },
  //life-cycle hooks
  data() {
    return {
      //state
      bookables: null,
      loading: false,
      columns: 3
    };
  },

  //computed properties...
  computed: {
    rows() {
      return this.bookables === null
        ? 0
        : Math.ceil(this.bookables.length / this.columns);
    }
  },
  methods: {
    bookablesInRow(row) {
      return this.bookables.slice((row - 1) * this.columns, row * this.columns);
    },
    placeholdersInRow(row) {
      return this.columns - this.bookablesInRow(row).length;
    }
  },
  //   beforeCreate() {
  //     console.log("Before create");
  //   },

  created() {
    //usually fetch data in this hook....

    this.loading = true;

    //API Calls
    const req = axios.get("/api/bookables").then(response => {
      this.bookables = response.data.data;
      this.loading = false;
    });
  }
  //   beforeMount() {
  //     console.log("Before mount");
  //   },
  //   mounted() {
  //     console.log("Mounted..");
  //   },
  //   beforeDestroy() {
  //     console.log("Before Destroy");
  //   },
  //   destroyed() {
  //     console.log("Destroyed");
  //   }
};
</script>

