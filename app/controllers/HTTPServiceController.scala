package controllers

import javax.inject.Inject

import akka.actor.ActorSystem
import bminjection.db.DBTrait
import bmlogic.common.requestArgsQuery
import bmlogic.dongdaHTTP.dongdaHTTPMessage.msg_daongdaHTTPpost
import bmmessages.{CommonModules, MessageRoutes}
import bmpattern.ResultMessage.msg_CommonResultMessage
import play.api.mvc.Action
import play.mvc.Controller

/**
  * Created by apple on 9/5/17.
  */
class HTTPServiceController @Inject () (as_inject : ActorSystem, dbt : DBTrait) extends Controller {
    implicit val as = as_inject
    def HTTPPOST = Action (request => requestArgsQuery().requestArgsV2(request) { jv =>
        import bmpattern.ResultMessage.common_result
        MessageRoutes(
            msg_daongdaHTTPpost(jv) :: msg_CommonResultMessage() :: Nil, None)(CommonModules(Some(Map("db" -> dbt))))
    })
}
