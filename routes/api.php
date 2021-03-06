<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// //endpoint for getting all bookables
// Route::get('bookables', function( Request $request) {
//     return Bookable::all();
// });


// //endpoint for getting a single bookable room
// Route::get('bookables/{id}', function (Request $request,$id) {
//     return Bookable::findOrFail($id);
// });

// Route::get('bookables','Api\BookableController@index');
// Route::get('bookables/{id}','Api\BookableController@show');


Route::apiResource('bookables','Api\BookableController');

Route::get('bookables/{bookable}/availability','Api\BookableAvailabilityController')->name('bookables.availability.show');

Route::get('bookables/{bookable}/reviews','Api\BookableReviewController')->name('bookables.reviews.index');

Route::get('bookables/{bookable}/price','Api\BookablePriceController')->name('bookales.price.show');

Route::apiResource('reviews','Api\ReviewController')->only(['show','store']);

Route::get('booking-by-review/{reviewKey}','Api\BookingByReviewController')->name('booking.by-review.show');


Auth::routes();

Route::get('home', 'HomeController@index')->name('home');
