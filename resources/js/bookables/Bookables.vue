<template>
  <div>
    <BookableListItem :title="bookable1.title" :content="bookable1.content" :price="1000"></BookableListItem>
    <BookableListItem :title="bookable2.title" :content="bookable2.content" :price="2000"></BookableListItem>
    <BookableListItem title="title3" content="content3" v-bind:price="3000"></BookableListItem>
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
      bookable1: null,
      bookable2: null,
      bookable3: null
    };
  },
  beforeCreate() {
    console.log("Before create");
  },

  created() {
    console.log("Created");
    //usually fetch data in this hook....
    console.log(this.bookable1);
    console.log(this.bookable2);
    setTimeout(() => {
      this.bookable1 = {
        title: "title111",
        content: "content111"
      };
      this.bookable2 = {
        title: "titl222",
        content: "content222"
      };
      this.bookable3 = {
        title: "titl333",
        content: "content333"
      };
    }, 2000);

    setTimeout(() => {
      this.bookable1.title = "YOu will see this!";
    }, 2000);

    setTimeout(() => {
      this.bookable3.title = "YOu will not see this!";
    }, 2000);
  },
  beforeMount() {
    console.log("Before mount");
  },
  mounted() {
    console.log("Mounted..");
  },
  beforeDestroy() {
    console.log("Before Destroy");
  },
  destroyed() {
    console.log("Destroyed");
  }
};
</script>