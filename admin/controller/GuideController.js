import {Guide} from "../model/Guide.js";

export class GuideController {


    constructor() {
        this.loadAllGuide();
        $("#btn-saveGuide").click(this.saveGuide.bind(this));
        $("#btn-deleteGuide").click(this.deleteGuide.bind(this));
        $("#btn-updateGuide").click(this.updateGuide.bind(this));
        $("#btn-searchGuide").click(this.searchGuide.bind(this));

    }

    static url = "http://deshanz-vivobook:8080/api/v1/mainGuide";

    searchGuide() {
        $.ajax({
            url: GuideController.url + "?id=" + $("#txtGuideId").val(),
            method: "GET",
            dataType: "json",
            success: function (resp) {
                $("#txtGuideId").val(resp.data.id);
                $("#txtGuideName").val(resp.data.name);
                $("#txtGuideNic").val(resp.data.nic);
                $("#txtGuideNum1").val(resp.data.num1);
                $("#txtGuideAddress").val(resp.data.address);
                $("#txtGuideValue").val(resp.data.value);


            }


        })
    }



    updateGuide() {
        let id = $("#txtGuideId").val();
        let name = $("#txtGuideName").val();
        let nic = $("#txtGuideNic").val();
        let num1 = $("#txtGuideNum1").val();
        let address = $("#txtGuideAddress").val();
        let value = $("#txtGuideValue").val();
        let guide = new Guide(id, name, nic, Number.parseInt(num1), address, Number.parseInt(value));

        $.ajax({
            url: GuideController.url,
            method: "PUT",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(guide),
            success: function (resp) {
                if (resp.code === 200) {
                    Swal.fire(resp.massage);
                } else {
                    Swal.fire(resp.massage)
                }

            }

        });

        this.loadAllGuide();
        this.clearTextField();

    }

    deleteGuide() {
        $.ajax({
            url: GuideController.url + "?id=" + $("#txtGuideId").val(),
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
        this.loadAllGuide();
        this.clearTextField();
    }

    saveGuide() {
        let id = $("#txtGuideId").val();
        let name = $("#txtGuideName").val();
        let nic = $("#txtGuideNic").val();
        let num1 = $("#txtGuideNum1").val();
        let address = $("#txtGuideAddress").val();
        let value = $("#txtGuideValue").val();
        let guide = new Guide(id, name, nic, Number.parseInt(num1), address, Number.parseInt(value));

        console.log(guide)


        $.ajax({
            url: GuideController.url,
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(guide),
            success: function (resp) {
                if (resp.code === 200) {
                    Swal.fire(resp.massage)
                } else {
                    Swal.fire(resp.massage);
                }
            }
        });
        this.clearTextField();

    }


    loadAllGuide() {
        $.ajax({
            url: GuideController.url,
            method: "GET",
            dataType: "json",
            success: function (resp) {
                $("#tbl-Guide-tbody").empty();
                for (const guide of resp.data) {
                    let row = `<tr><td>${guide.id}</td><td>${guide.name}</td><td>${guide.nic}</td><td>${guide.num1}</td><td>${guide.address}</td><td>${guide.value}</td></tr>`;
                    $("#tbl-Guide-tbody").append(row);
                    $("#tbl-Guide-tbody>:last-child").click(function () {
                        let id = $(this).children().eq(0).text();
                        let name = $(this).children().eq(1).text();
                        let nic = $(this).children().eq(2).text();
                        let num1 = $(this).children().eq(3).text();
                        let address = $(this).children().eq(4).text();
                        let value = $(this).children().eq(5).text();

                        $("#txtGuideId").val(id);
                        $("#txtGuideName").val(name);
                        $("#txtGuideNic").val(nic);
                        $("#txtGuideNum1").val(num1);
                        $("#txtGuideAddress").val(address);
                        $("#txtGuideValue").val(value);

                    });
                }
            }
        })
    }

    clearTextField() {
        $("#txtGuideId").val("");
        $("#txtGuideName").val("");
        $("#txtGuideNic").val("");
        $("#txtGuideNum1").val("");
        $("#txtGuideAddress").val("");
        $("#txtGuideValue").val("");

    }


}

new GuideController();