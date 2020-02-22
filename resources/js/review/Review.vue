<template>
    <div>
        <div class="form-group">
            <label class="text-muted">How would you rate this place?</label>
            <star-rating class="fa-3x" v-model="review.rating"></star-rating>
        </div>

        <div class="form-group">
            <label for="content" class="text-muted"
                >How was your experience?</label
            >
            <textarea
                name="content"
                cols="30"
                rows="10"
                class="form-control"
                v-model="review.content"
            ></textarea>
        </div>

        <button class="btn btn-lg btn-primary btn-block">Submit</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            review: {
                rating: 5,
                content: null
            }
        };
    },
    // methods: {
    //     onRatingChanged(rating) {
    //         console.log(rating);
    //     }
    // }
    created() {
        //check if a review already exists (in database by id )
        //fetch a booking by a review key
        //store the review to the database
    }
};
</script>
