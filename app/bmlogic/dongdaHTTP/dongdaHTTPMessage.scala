package bmlogic.dongdaHTTP

import bmmessages.CommonMessage
import play.api.libs.json.JsValue

/**
  * Created by yym on 9/5/17.
  */
abstract class msg_HTTPCommand extends CommonMessage
object dongdaHTTPMessage{
    case class msg_daongdaHTTPpost(data : JsValue) extends msg_HTTPCommand
}
