import {VehicleCategory} from "../model/VehicleCategory.js";

export class VehicleCategoryController {
    constructor() {
        this.getAllVehicleCategory();
        $("#btn-save-vehicleCategory").click(this.saveVehicleCategory.bind(this));
        $("#btn-update-vehicleCategory").click(this.updateVehicleCategory.bind(this));
        $("#btn-delete-vehicleCategory").click(this.deleteVehicleCategory.bind(this));

    }

    /*Update=============================================*/
    updateVehicleCategory() {

        let id = $("#txtVehicleCategoryId").val();
        let type = $("#txtVehicleCategoryType").val();


        let vehicleCategory = new VehicleCategory(id, type);
        if (vehicleCategory.categoryType !== "") {

            console.log(vehicleCategory)

            $.ajax({
                url: "http://localhost:8080/api/v1/vehicleCategory/consume",
                method: "PUT",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(vehicleCategory),
                success: function (resp) {
                    if (resp.code === 200) {
                        alert(resp.massage);
                    } else if (resp.code === 404 | 400 | 401) {
                        alert(resp.massage);
                    } else {
                        alert(resp.massage);
                    }
                }
            });
        } else {
            alert("Vehicle Category Cannot Null!")
        }
        this.cleartextField();
    }

    /*Save==========================================================*/
    saveVehicleCategory() {

        let type = $("#txtVehicleCategoryType").val();

        let vehicleCategory = new VehicleCategory(null, type);
        if (vehicleCategory.categoryType !== "") {
            console.log(vehicleCategory)
            $.ajax({
                    url: "http://localhost:8080/api/v1/vehicleCategory/consume",
                    method: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(vehicleCategory),
                    success: function (resp) {
                        if (resp.code === 200) {
                            alert(resp.massage);
                            $("#txtVehicleCategoryType").val()

                        } else if (resp.code === 404) {
                            alert(resp.massage);
                        } else {
                            alert(resp.massage);
                        }
                    }
                }
            );
        } else {
            alert("Vehicle Category Cannot Null!");
        }
        this.cleartextField();


    }

    getAllVehicleCategory() {
        let url = "http://deshanz-vivobook:8080/api/v1/vehicleCategory/consume";
        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            success: function (resp) {
                $("#tbl-vehicleCategory-tbody").empty();
                for (const category of resp.data) {
                    let row = `<tr><td>${category.categoryId}</td><td>${category.categoryType}</td></tr>`
                    $("#tbl-vehicleCategory-tbody").append(row);


                    $("#tbl-vehicleCategory-tbody>:last-child").click(function () {
                        let id = $(this).children().eq(0).text();
                        let type = $(this).children().eq(1).text();

                        console.log(id + " " + type);
                        $("#txtVehicleCategoryId").val(id);
                        $("#txtVehicleCategoryType").val(type);
                    });
                }
            }
        });
    }

    deleteVehicleCategory() {
        let type = $("#txtVehicleCategoryType").val();

        let url = "http://deshanz-vivobook:8080/api/v1/vehicleCategory/consume?type=";
        $.ajax({
            url: url + type,
            method: "DELETE",
            data: "json",
            success: function (resp) {
                if (resp.code === 200) {
                    alert("Delete Successfully!");
                    this.getAllVehicleCategory();
                } else if (resp.code === 404) {
                    alert(resp.massage);
                } else {
                    alert(resp.massage);
                }
            }
        });
        this.cleartextField();
    }


    isValid() {

    }

    cleartextField(){
        $("#txtVehicleCategoryType").val("");
        $("#txtVehicleCategoryId").val("")
    }


}

new VehicleCategoryController();