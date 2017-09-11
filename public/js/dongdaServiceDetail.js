/**
 * Created by yym on 9/7/17.
 */
$(document).ready(function () {
    goServiceDetail()
})
var goServiceDetail = function () {
    var token = $.cookie("token");
    var user_id = $.cookie("user_id");
    var service_id = $.cookie("service_id")
    var js = {
        "data" : {
            "token": token,
            "condition": {
                "user_id": user_id,
                "service_id" : service_id
            }

        },

        "url" : "http://altlys.com:9999/al/kidnap/detail"

    };
    $.ajax({
        type : "POST",
        url : "/http/post",
        data : JSON.stringify(js),
        contentType : "application/json,charset=utf-8",
        success : function (data) {
            var service = data.result.result.service
            appendServiceDetail(service)

        }
    })

    var appendServiceDetail = function (data) {
        // $("#title").append("<td>" +data.title+"</td>");
        // $("#description").append("<td>" +data.description+"</td>");
        // $("#images").append("<td>" +data.images+"</td>");
        // $("#category").append("<td>" +data.category.cans_cat+"</td>");
        // $("#address").append("<td>" +data.location.address+"</td>");
        // $("#price").append("<td>" +data.detail.price+"</td>");
        // $("#age_boundary").append("<td>" +data.age_boundary+"</td>");
        var imgs = data.images.toString().split(",").map(function (x) {
            return "http://altlys.com:9999/query/downloadFile/" +x;
        })
        var imgsHtml = imgs.map(function (x) {
            var shtml=
            "<div class='polaroid'>" +
                "<img src='"+x+"'  class='serviceImg'>"+
                "<div class='s_container'>"+
                "</div>"+
            "</div>"
            return shtml
        })
        $("#title").text(data.title);
        $("#description").text(data.description);
        $("#images").append(imgsHtml)
        $("#category").text(data.category.cans_cat);
        $("#address").text(data.location.address);
        $("#price").text(data.detail.price);
        $("#age_boundary").text(data.detail.age_boundary.lsl + "~"+ data.detail.age_boundary.usl);
        // $("#").append("<td>" ++"</td>");
        // $("#").append("<td>" ++"</td>");
        // $("#").append("<td>" ++"</td>");
    }
}