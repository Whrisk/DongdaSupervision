/**
 * Created by yym on 8/31/17.
 */

$(document).ready(function () {
    codeSend();
    // codeSend()
    // codeCheck()
    // authCode()
})

// ------------------------------获取token等客户条件-------------------------
var codeSend = function () {
    var sendJsdata = {
        "data" : {
            "phone" : "18787112216"
        },

        "url" : "http://altlys.com:9999/al/code/send"
    };
    $.ajax({
        type : "POST",
        url : "/http/post",
        dataType: "json",
        data : JSON.stringify(sendJsdata),
        contentType : "application/json,charset=utf-8",
        async: false,
        success : function (data) {
            $.cookie("reg_token" , data.result.result.reg.reg_token);
            codeCheck();
        }
    });

}
var codeCheck = function () {
    var reg=$.cookie("reg_token");
    var checkJs={
        "data" : {
            "phone" : "18787112216",
            "code" : "1111",
            "reg_token" : reg
        },
        "url" : "http://altlys.com:9999/al/code/check"
    }
    $.ajax({
        type : "POST",
        url : "/http/post",
        data : JSON.stringify(checkJs),
        contentType : "application/json,charset=utf-8",
        async: false,
        success : function (data) {
            // $.cookie("token",data.result.auth_token);
            // $.cookie("user_id",data.result.user.user_id);
            authCode();
        }
    })
}
var authCode = function () {
    var reg=$.cookie("reg_token");
    var checkJs={
        "data" : {
            "phone" : "18787112216",
            "code" : "1111",
            "reg_token" : reg
        },
        "url" : "http://altlys.com:9999/al/auth/code"
    }
    $.ajax({
        type : "POST",
        url : "/http/post",
        data : JSON.stringify(checkJs),
        contentType : "application/json,charset=utf-8",
        async: false,
        success : function (data) {
            $.cookie("token",data.result.result.auth_token);
            $.cookie("user_id",data.result.result.user.user_id);
            servicePage();
        }
    })
}
//------------------------------------service 数据------------------------------
var getServices = function() {
    // codeSend()
    // codeCheck();
    // authCode();
    var token = $.cookie("token");
    var user_id = $.cookie("user_id");
    var serviceJs = {
        "data" : {
            "token": token,
            "condition": {
                "user_id": user_id

            }

        },

        "url" : "http://altlys.com:9999/al/kidnap/search"

    };
    $.ajax({
        type : "POST",
        url : "/http/post",
        data : JSON.stringify(serviceJs),
        contentType : "application/json,charset=utf-8",
        async: false,
        success : function (data) {
            layui.use('laypage', function(){
                var laypage = layui.laypage;
                var some=data.result.result.services
                laypage.render({
                    elem: 'page',
                    limit: 10,
                    count: some.length,
                    jump : function (obj,first) {
                        $("#serviceTable").empty()
                        var sum = obj.curr * obj.limit
                        for(var i = 0; i < sum;i++)
                            if(i >= sum - obj.limit)
                                appendService(data.result.result.services[i])
                    }
                });
            });
        }
    })

};

var servicePage = function () {
    var token = $.cookie("token");
    var user_id = $.cookie("user_id");
    layui.use('laypage', function () {
        var laypage = layui.laypage;
        laypage.render({
            elem: 'page',
            limit: 20,
            count : 605,
            jump : function (obj,first) {
                ServiceData(token, user_id, obj.limit, obj.curr)
                
            }
        })
    })
}

var firstServiceData = function (token, user_id, limit) {
    var js = {
        "data" : {
            "token": token,
            "take" : limit,
            "condition": {
                "user_id": user_id
            }

        },

        "url" : "http://altlys.com:9999/al/kidnap/search"

    }
    $.ajax({
        type : "POST",
        url : "/http/post",
        data : JSON.stringify(js),
        contentType : "application/json,charset=utf-8",
        success : function (data) {
            $("#serviceTable").empty();
            for(var i = 0; i < limit;i++)
                appendService(data.result.result.services[i])

        }
    })
}

var ServiceData = function (token, user_id, limit, curr) {
    var skip = (curr - 1) * limit
    var js = {
        "data" : {
            "token": token,
            "take" : limit,
            "skip" : skip,
            "condition": {
                "user_id": user_id
            }

        },

        "url" : "http://altlys.com:9999/al/kidnap/search"

    }
    $.ajax({
        type : "POST",
        url : "/http/post",
        data : JSON.stringify(js),
        contentType : "application/json,charset=utf-8",
        success : function (data) {
            $("#serviceTable").empty()
            for(var i = 0; i < limit;i++)
                appendService(data.result.result.services[i])

        }
    })
}

var appendService = function (v) {
    $("#serviceTable").append("<tr onclick=goServiceDetail('"+v.service_id+"')>" +
        "<th>" +v.title+ "</th>"+
        "<th>" +v.location.address+ "</th>"+
        "<th>" +v.category.service_cat+ "</th>"+
        "</tr>")
};

//----------------------跳转 service detail 页面---------------------
var goServiceDetail = function (data) {
    var service_id = data;
    console.log(service_id);
    console.log($.cookie("service_id"));
    if($.cookie("service_id") == undefined) {
        $.cookie("service_id", service_id);
    }else {
        $.cookie("service_id", null);
        $.cookie("service_id", service_id);
    }
    window.open("/service/detail");

}

