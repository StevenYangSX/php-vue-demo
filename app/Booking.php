<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Booking extends Model
{
    public function bookable() {
        return $this->belongsTo(Bookable::class);
    }

    public function review() {
        return $this->hasOne(Review::class);
    }

    public function scopeBetweenDates(Builder $query, $from, $to) {
        return $query->where('to','>=', $from)->where('from',"<=", $to);
    }


    public static function findByReviewKey(string $reviewKey): ? Booking {
        return static::where('review_key', $reviewKey)->with('bookable')->get()->first();
    }
    //model events
    protected static function boot() {
        parent::boot();

        //register an event 
        static::creating(function ($booking) {
            $booking->review_key = Str::uuid();
        });
    }
}
