import {PackageCategory} from "../model/PackageCategory.js";

export class PackageCategoryController {
    constructor() {
        this.loadAllPackageCategory();
        $("#btn-Package-save").click(this.savePackage.bind(this));
        $("#btn-Package-Delete").click(this.deletePackage.bind(this));
        $("#btn-Package-update").click(this.updatePackage.bind(this));
    }

    static url = "http://deshanz-vivobook:8080/api/v1/consume/category";

    updatePackage() {
        let id = $("#txtPackageId").val();
        let name = $("#txtPackageName").val();

        let packageCategory = new PackageCategory(id, name);
        if (packageCategory.category !== "") {
            $.ajax({
                url: PackageCategoryController.url,
                method: "PUT",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(packageCategory),
                success: function (resp) {
                    console.log(resp);
                    if (resp.code === 200) {
                        Swal.fire(resp.massage)
                    } else if (resp === 404) {
                        Swal.fire(resp.massage)
                    } else {
                        Swal.fire(resp.massage)
                    }
                }
            });

        } else {
            Swal.fire("Invalid Input OR Null Value Has Been Included Please Check Your Data!");
        }
        this.loadAllPackageCategory();
        this.clearTextField();
    }


    deletePackage() {
        let id = $("#txtPackageId").val();
        $.ajax({
            url: PackageCategoryController.url + "?id=" + id,
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
        this.loadAllPackageCategory();
        this.clearTextField();
    }


    savePackage() {
        let id = $("#txtPackageId").val();
        let name = $("#txtPackageName").val();

        let packageCategory = new PackageCategory(id, name);

        if (this.isValid() && packageCategory.category!=="") {

            $.ajax({
                url: PackageCategoryController.url,
                method: "POST",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(packageCategory),
                success: function (resp) {
                    console.log(resp);
                    if (resp.code === 200) {
                        Swal.fire(resp.massage)
                    } else if (resp === 404) {
                        Swal.fire(resp.massage)
                    } else {
                        Swal.fire(resp.massage)
                    }
                }
            });
        } else {

            Swal.fire("Invalid Input OR Null Value Has Been Included Please Check Your Data!");
        }

        this.loadAllPackageCategory();
        this.clearTextField();
    }


    loadAllPackageCategory() {
        $.ajax({
            url: PackageCategoryController.url,
            method: "GET",
            data: "json",
            success: function (resp) {
                $("#tbl-package-body").empty();
                for (const packages of resp.data) {
                    let row = `<tr><td>${packages.id}</td><td>${packages.category}</td></tr>`
                    $("#tbl-package-body").append(row);

                    $("#tbl-package-body>:last-child").click(function () {
                        let id = $(this).children().eq(0).text();
                        let type = $(this).children().eq(1).text();

                        console.log(id + " " + type);
                        $("#txtPackageId").val(id);
                        $("#txtPackageName").val(type);
                    });
                }
            }
        });
    }

    clearTextField() {
        $("#txtPackageId").val("");
        $("#txtPackageName").val("");
    }

    isValid() {
        let isId = /^PACK([0-9]){3,3}$/;
        let id = $("#txtPackageId").val();

        if (!isId.test(id)) {
            $("#txtPackageId").css('border', '2px solid #e80507');
            $("#error-type-mainPackagecategory").text("Follow This: PACK001").css('color', '#e80507');
            return false;
        } else {
            $("#txtPackageId").css('border', '2px solid #26de81');
            $("#error-type-mainPackagecategory").text("");

        }
        return true;

    }

}

new PackageCategoryController();