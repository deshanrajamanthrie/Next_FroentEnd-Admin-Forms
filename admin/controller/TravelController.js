import {Travel} from "../model/Travel.js";

export class TravelController {
    constructor() {
        this.loadAllTravel();
    }

    static url = "http://deshanz-vivobook:8080/api/v1/travel/consume";

    loadAllTravel() {
        $.ajax({
            url: TravelController.url,
            method: "GET",
            contentType: "json",
            success: function (resp) {
                $("#tbl-travel-tbody").empty();
                for (const travel of resp.data) {
                  let row=  `<tr>
                        <td>${travel.id}</td>
                        <td>${travel.travelArea}</td>
                        <td>${travel.dates[0].startDate}</td>
                        <td>${travel.dates[0].endDate}</td>
                        <td>${travel.countDays}</td>
                        <td>${travel.guide}</td>
                        <td>${travel.noChildren}</td>
                        <td>${travel.noAdult}</td>
                        <td>${travel.headCount}</td>
                        <td>${travel.paidValue}</td>
                        <td>${travel.packageCategory.id}</td>
                        <td></td>
                    </tr>`

                    $("#tbl-travel-tbody").append(row);
                }

            }

        })
    }


}

new TravelController();