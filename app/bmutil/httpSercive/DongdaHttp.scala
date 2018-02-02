package bmutil.httpSercive

import play.api.libs.json.JsValue

/**
  * Created by yym on 9/5/17.
  */
case class DongdaHttpPost(val url: String,val data : JsValue) {
    def call : JsValue = {
        (HTTP(url)).post(data).as[JsValue]
    }
}

