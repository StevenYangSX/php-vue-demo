<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bookable extends Model
{

    protected $fillable = ['from', 'to'];


    public function bookings() {

        return $this->hasMany(Booking::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }

    public function availableFor($from , $to) {
        return 0 === $this->bookings()->betweenDates($from, $to)->count();
    }
}
