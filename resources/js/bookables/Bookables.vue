<template>
  <div>
    <div v-if="loading">
      <p>Data is Loading...</p>
    </div>
    <div v-else>
      <div class="row mb-4" v-for="row in rows" :key="'row'+row">
        <div class="col" v-for="(bookable,column) in bookablesInRow(row)" :key="'row'+row+column">
          <BookableListItem :title="bookable.title" :content="bookable.content" :price="1000"></BookableListItem>
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
    // console.log("Created");
    //usually fetch data in this hook....
    // console.log(this.bookable1);
    // console.log(this.bookable2);
    (this.loading = true),
      setTimeout(() => {
        this.bookables = [
          {
            id: 1,
            title: "room1",
            content: "content1"
          },
          {
            id: 2,
            title: "room2",
            content: "content2"
          },
          {
            id: 3,
            title: "room2",
            content: "content2"
          },
          {
            id: 4,
            title: "room2",
            content: "content2"
          },
          {
            id: 5,
            title: "room2",
            content: "content2"
          },
          {
            id: 6,
            title: "room2",
            content: "content2"
          },
          {
            id: 7,
            title: "room2",
            content: "content2"
          }
        ];
        this.loading = false;
      }, 1000);

    // setTimeout(() => {
    //   this.bookable1.title = "YOu will see this!";
    // }, 7000);

    // setTimeout(() => {
    //   this.bookable2.title = "YOu will not see this!";
    // }, 7000);
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

