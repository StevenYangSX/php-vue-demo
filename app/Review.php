<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    //relationships between models
    public function bookable() {
        return $this->belongsTo(Bookable::class);
    }

    public function booking() {
        return $this->belongsTo(Booking::class);
    }
    //using uuid need to change here
    public function getIncrementing() {
        return false;
    }

    public function getKeyType() {
        return 'string';
    }


}
