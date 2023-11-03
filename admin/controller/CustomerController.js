import {Customer} from "../model/Customer.js";


export class CustomerController {
    constructor() {
        this.loadAllCustomer();

    }

    static url = "http://deshanz-vivobook:8080/api/v1/consume/users";

    loadAllCustomer() {
        $.ajax({
            url: CustomerController.url,
            method: "GET",
            contentType: "application/json",
            success: function (resp) {

                console.log(resp.data);
                $("#tbl-customer-body").empty();
                if (resp.code === 200) {
                    for (const customer of resp.data) {
                        let row=`<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.nic}</td><td>${customer.address}</td><td>${customer.email}</td></tr>`;
                        $("#tbl-customer-body").append(row);
                    }

                }

            }


        });


    }
}


new CustomerController();