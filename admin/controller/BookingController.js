import {Booking} from "../model/Booking.js";

export class BookingController {
    constructor() {
        this.loadAllBooking();

    }

    static url = "http://deshanz-vivobook:8080/api/v1/booking/consume";


    loadAllBooking() {
        $.ajax({
            url: BookingController.url,
            method: "GET",
            dataType: "json",
            success: function (resp) {
                $("#tbl-booking-tbody").empty();
                for (const booking of resp.data) {
                    let row = `<tr>
                        <td>${booking.bookingId}</td>
                        <td>${booking.date}</td>
                        <td>${booking.vehicleId}</td>
                        <td>${booking.guideId}</td>
                        <td>${booking.travelId}</td>
                        <td>${booking.hotelId}</td>
                        <td>${booking.paid}</td>
                        <td>${booking.paymentStatus}</td>
                        <td>${booking.user.id}</td>
                    </tr>`
                    $("#tbl-booking-tbody").append(row);

                }


            }
        });


    }


}

new BookingController();