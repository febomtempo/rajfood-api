release: ENV_SILENT=true node ./build/ace migration:fresh --force
web: ENV_SILENT=true node ./build/server.js
worker: sh -c ENV_SILENT=true node ./build/ace db:seed