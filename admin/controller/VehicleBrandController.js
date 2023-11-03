import {VehicleBrand} from "../model/VehicleBrand.js";

export class VehicleBrandController {
    constructor() {
        this.loadAllVehicleData();
        $("#btn-update-vehicle").click(this.updateVehicleBrand.bind(this));
        $("#btn-save-vehicle").click(this.saveVehicleBrand.bind(this));
        $("#btn-search-vehicle").click(this.searchVehicleBrand.bind(this));
    }

    static url = "http://deshanz-vivobook:8080/api/v1/consume/brand";

    searchVehicleBrand() {

        $.ajax({
            url: VehicleBrandController.url + "/search?id=" + $("#txtvehicleIdsearch").val(),
            method: "GET",
            dataType: "json",
            success: function (resp) {
                $("#txtbrandName").val(resp.data.brandName);
                $("#txtseatCapacity").val(resp.data.seat);
                $("#txtvehicleQty").val(resp.data.qty);
                $("#txtfuelType").val(resp.data.fuelType);
                $("#txtfee1km").val(resp.data.fee1km);
                $("#txtfuelConsumption").val(resp.data.fuel1km);
                $("#txtfeeOneday").val(resp.data.feeForOneDay);
                $("#txtvehicleCategory").val(resp.data.category.categoryId);
            }

        })

    }


    updateVehicleBrand() {
        let Vehicle = {
            vehicleId: $("#txtvehicleIdsearch").val(),
            brandName: $("#txtbrandName").val(),
            seat: $("#txtseatCapacity").val(),
            qty: $("#txtvehicleQty").val(),
            fuelType: $("#txtfuelType").val(),
            fee1km: $("#txtfee1km").val(),
            fuel1km: $("#txtfuelConsumption").val(),
            feeForOneDay: $("#txtfeeOneday").val(),
            category: {
                categoryId: $("#txtvehicleCategory").val()
            }
        }
        $.ajax({
            url: VehicleBrandController.url,
            method: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(Vehicle),
            success: function (resp) {
                if (resp.code === 200) {
                    Swal.fire(resp.massage);
                    this.loadAllVehicleData();
                } else {
                    Swal.fire(resp.massage);
                }
            }
        });
        this.clearTextField();


    }


    saveVehicleBrand() {
        let Vehicle = {
            brandName: $("#txtbrandName").val(),
            seat: $("#txtseatCapacity").val(),
            qty: $("#txtvehicleQty").val(),
            fuelType: $("#txtfuelType").val(),
            fee1km: $("#txtfee1km").val(),
            fuel1km: $("#txtfuelConsumption").val(),
            feeForOneDay: $("#txtfeeOneday").val(),
            category: {
                categoryId: $("#txtvehicleCategory").val()
            }
        }
        $.ajax({
            url: VehicleBrandController.url,
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(Vehicle),
            success: function (resp) {
                if (resp.code === 200) {
                    Swal.fire(resp.massage);
                } else {
                    Swal.fire(resp.massage);
                }
            }
        });
        this.clearTextField();
    }


    loadAllVehicleData() {
        $.ajax({
            url: VehicleBrandController.url,
            method: "GET",
            contentType: "json",
            success: function (resp) {
                console.log(resp.data)
                $("#tbl-VehicleBrand-tbody").empty();
                for (const vehicle of resp.data) {
                    let row = `<tr>
                        <td>${vehicle.vehicleId}</td>
                        <td>${vehicle.brandName}</td>
                        <td>${vehicle.seat}</td>
                        <td>${vehicle.qty}</td>
                        <td>${vehicle.fuelType}</td>
                        <td>${vehicle.fee1km}</td>
                        <td>${vehicle.fuel1km}</td>
                        <td>${vehicle.feeForOneDay}</td>
                        <td>${vehicle.category.categoryId}</td>
                    </tr>`;
                    $("#tbl-VehicleBrand-tbody").append(row);
                }
            }


        });
    }

    clearTextField() {
        $("#txtbrandName").val("");
        $("#txtseatCapacity").val("");
        $("#txtvehicleQty").val("");
        $("#txtfuelType").val("");
        $("#txtfee1km").val("");
        $("#txtfuelConsumption").val("");
        $("#txtfeeOneday").val("");
    }


}

new VehicleBrandController();