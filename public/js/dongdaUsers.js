/**
 * Created by yym on 8/31/17.
 */
$(document).ready(function () {
    getUsers();
})
// ---todo-----
var getUsers=function () {
    var token = $.cookie("token");
    var user_id = $.cookie("user_id")
    var js = {
        "token" : token,
        "condition" : {
            "user_id" : user_id
        }
    }
    $.ajax({
        type : "POST",
        url : "",
        data : JSON.stringify(js),
        contentType : "application/json,charset=utf-8",
        success: function (data) {
            appendUsers(data)
        }
    })
};

var appendUsers = function (v) {

    $("#userTable").append("<tr>" +
        "<th>" +v.user_id+ "</th>"+
        "<th>" +v.date+ "</th>"+
        "<th>" +v.province+ "</th>"+
        "<th>" +v.product_name+ "</th>"+
        "<th>" +v.sales+ "</th>"+
        "<th>" +v.units+ "</th>"+
        "<th>" +v.oral_name+ "</th>"+
        "<th>" +v.manufacture+ "</th>"+
        "<th>" +v.specifications+ "</th>"+
        "<th>" +v.act1+ "</th>"+
        "<th>" +v.act2+ "</th>"+
        "<th>" +v.act3+ "</th>"+
        "<th>" +v.product_unit+ "</th>"+
        "<th>" +v.manufacture_type+ "</th>"+
        "<th>" +v.product_type+ "</th>"+
        "<th>" +v.package+ "</th>"+
        "</tr>")
}