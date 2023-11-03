export class Booking {
    constructor(bookingId, date, vehicleId, guideId, travelId, hotelId, paid, paymentStatus, user) {
        this.bookingId=bookingid;
        this.date=date;
        this.vehicleId=vehicleId;
        this.guideId=guideId;
        this.travelId=travelId;
        this.hotelId=hotelId;
        this.paid=paid;
        this.paymentStatus=paymentStatus;
        this.user=user;
    }

}

/*
private long bookingId;

private String date;

private long vehicleId;

private String guideId;

private String travelId;

private String hotelId;

private double paid;

private String paymentStatus;

private UserDTO user;*/
