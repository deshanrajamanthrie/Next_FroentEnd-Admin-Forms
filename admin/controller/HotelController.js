import {Hotel} from "../model/Hotel.js";
import {Contact} from "../model/Contact.js";

export class HotelController {
    constructor() {
        this.loadAllHotels();
        $("#btn-save-hotel").click(this.saveHotel.bind(this));
        $("#btn-delete-hotel").click(this.deleteHotel.bind(this));
        $("#btn-update-hotel").click(this.updateHotel.bind(this));
    }

    static url = "http://deshanz-vivobook:8080/api/v1/hotel/consume";

    updateHotel() {
        let id = $("#txtHotel-id").val();
        let name = $("#txtHotel-name").val();
        let starRate = $("#txtStarRate").val();
        let location = $("#txtHotelLocation").val();
        let email = $("#txtHotelEmail").val();
        let contactNum1 = $("#txtContactNum1").val();
        let contactNum2 = $("#txtContactNum2").val();
        let pets = $("#txtPetsAllow").val();
        let op1 = $("#txtHotelOp1").val();
        let op2 = $("#txtHotelOp2").val();
        let op3 = $("#txtHotelOp3").val();
        let op4 = $("#txtHotelOp4").val();


        let Hotel = {     //create Literal Base Object
            id: id,
            name: name,
            starRate: Number.parseInt(starRate),
            location: location,
            contacts: [{
                email: email,
                contactNum1: contactNum1,
                contactNum2: contactNum2
            }
            ],
            pets: pets,
            op1: op1,
            op2: op2,
            op3: op3,
            op4: op4

        }
        $.ajax({
            url: HotelController.url,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(Hotel),   //java Script obj convert To Json Object
            success: function (resp) {
                if (resp.code === 200) {
                    Swal.fire(resp.massage);
                } else {
                    Swal.fire(resp.massage);
                }
            }
        });
        this.clearTextField();
        this.loadAllHotels();

    }


    deleteHotel() {
        let id = $("#txtHotel-id").val();
        $.ajax({
            url: HotelController.url + "?id=" + id,
            method: "DELETE",
            dataType: "json",
            success: function (resp) {
                if (resp.code === 200) {
                    Swal.fire(resp.massage);
                } else {
                    Swal.fire(resp.massage);
                }
            }
        });
        this.clearTextField();
        this.loadAllHotels();
    }


    saveHotel() {

        let id = $("#txtHotel-id").val();
        let name = $("#txtHotel-name").val();
        let starRate = $("#txtStarRate").val();
        let location = $("#txtHotelLocation").val();
        let email = $("#txtHotelEmail").val();
        let contactNum1 = $("#txtContactNum1").val();
        let contactNum2 = $("#txtContactNum2").val();
        let pets = $("#txtPetsAllow").val();
        let op1 = $("#txtHotelOp1").val();
        let op2 = $("#txtHotelOp2").val();
        let op3 = $("#txtHotelOp3").val();
        let op4 = $("#txtHotelOp4").val();


        let Hotel = {     //create Literal Base Object
            id: id,
            name: name,
            starRate: Number.parseInt(starRate),
            location: location,
            contacts: [{
                email: email,
                contactNum1: contactNum1,
                contactNum2: contactNum2
            }
            ],
            pets: pets,
            op1: op1,
            op2: op2,
            op3: op3,
            op4: op4

        }
        // let postUrl = "http://deshanz-vivobook:8080/api/v1/hotel/consume";
        $.ajax({
            url: HotelController.url,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(Hotel),   //java Script obj convert To Json Object
            success: function (resp) {
                if (resp.code === 200) {
                    Swal.fire(resp.massage);
                } else {
                    Swal.fire(resp.massage);
                }
            }
        });
        this.clearTextField();
        this.loadAllHotels();

    }

    /*Load All Data */
    loadAllHotels() {
        const url = "http://deshanz-vivobook:8080/api/v1/hotel/consume";
        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            success: function (resp) {
                console.log(resp.data);
                $("#tbl-hotel-body").empty();
                for (const hotel of resp.data) {
                    const hotelRow = `<tr><td>${hotel.id}</td><td>${hotel.name}</td><td>${hotel.starRate}</td> <td>${hotel.location}</td> <td>${hotel.contacts[0].email}</td> <td>${hotel.contacts[0].contactNum1}</td> <td>${hotel.contacts[0].contactNum2}</td><td>${hotel.pets}</td><td>${hotel.op1}</td><td>${hotel.op2}</td><td>${hotel.op3}</td><td>${hotel.op4}</td></tr>`;
                    $("#tbl-hotel-body").append(hotelRow);


                    $("#tbl-hotel-body>:last-child").click(function () {
                        let id = $(this).children().eq(0).text();
                        let name = $(this).children().eq(1).text();
                        let starRate = $(this).children().eq(2).text();
                        let location = $(this).children().eq(3).text();
                        let email = $(this).children().eq(4).text();
                        let contactNum1 = $(this).children().eq(5).text();
                        let contactNum2 = $(this).children().eq(6).text();
                        let petsAllow = $(this).children().eq(7).text();
                        let op1 = $(this).children().eq(8).text();
                        let op2 = $(this).children().eq(9).text();
                        let op3 = $(this).children().eq(10).text();
                        let op4 = $(this).children().eq(11).text();


                        $("#txtHotel-id").val(id);
                        $("#txtHotel-name").val(name);
                        $("#txtStarRate").val(starRate);
                        $("#txtHotelLocation").val(location);
                        $("#txtHotelEmail").val(email);
                        $("#txtContactNum1").val(contactNum1);
                        $("#txtContactNum2").val(contactNum2);
                        $("#txtPetsAllow").val(petsAllow);
                        $("#txtHotelOp1").val(op1);
                        $("#txtHotelOp2").val(op2);
                        $("#txtHotelOp3").val(op3);
                        $("#txtHotelOp4").val(op4);
                    });


                }
            }

        });
    }

    clearTextField() {
        $("#txtHotel-id").val("");
        $("#txtHotel-name").val("");
        $("#txtStarRate").val("");
        $("#txtHotelLocation").val("");
        $("#txtHotelEmail").val("");
        $("#txtContactNum1").val("");
        $("#txtContactNum2").val("");
        $("#txtPetsAllow").val("");
        $("#txtHotelOp1").val("");
        $("#txtHotelOp2").val("");
        $("#txtHotelOp3").val("");
        $("#txtHotelOp4").val("");

    }


}

let hotelController = new HotelController();
