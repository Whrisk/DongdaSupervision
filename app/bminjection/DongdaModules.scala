package bminjection

import bminjection.db.DBTrait
import play.api.{Configuration, Environment}

class DongdaModules extends play.api.inject.Module {
    def bindings(env : Environment, conf : Configuration) = {
        Seq(
            bind[DBTrait].to[DongdaModuleImpl]
        )
    }
}