package controllers

import play.api.mvc._

/**
  * Created by yym on 9/4/17.
  */
class PagesController extends Controller{
    def goDongdaService = Action{
        Ok(views.html.dongdaService())
    }
    
    def goDongdaServiceDetail = Action{
        Ok(views.html.dongdaServiceDetail())
    }
}
