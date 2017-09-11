package bmlogic.dongdaHTTP

import bmlogic.dongdaHTTP.dongdaHTTPMessage.msg_daongdaHTTPpost
import bmmessages.{CommonModules, MessageDefines}
import bmpattern.ModuleTrait
import bmutil.errorcode.ErrorCode
import bmutil.httpSercive.DongdaHttpPost
import play.api.libs.json._

/**
  * Created by yym on 9/5/17.
  */
object HTTPModule extends ModuleTrait{
    def dispatchMsg(msg : MessageDefines)(pr : Option[Map[String, JsValue]])(implicit cm : CommonModules) : (Option[Map[String, JsValue]], Option[JsValue]) = msg match {
        case msg_daongdaHTTPpost(data) => dongrdaHTTPPost(data)
        case _ => ???
    }
    def dongrdaHTTPPost(data : JsValue) : (Option[Map[String, JsValue]], Option[JsValue]) = {
        try {
            val url = (data \ "url").get.asOpt[String].getOrElse("url get error")
            val d = (data \ "data").get.as[JsValue]
            val result =DongdaHttpPost(url, d).call
            val js_result = (result \ "result").get.asOpt[JsValue].get
            val js_status = (result \ "status").get.asOpt[String].get
            js_status match {
                case "ok" => {
                    (Some(Map(
                        "status" -> Json.toJson("ok"),
                        "result" -> Json.toJson(js_result)
                    )), None)
                }
                case "error" => (None, Some(result))
            }
        } catch {
            case ex : Exception =>
                println(ex)
                (None, Some(ErrorCode.errorToJson(ex.getMessage)))
        }
    }
    
}
