/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

/*
//Grupo Completo - Admin
Route.group(()=>{
  Route.resource('/cliente', 'ClientesController').apiOnly().except(['store','show'])
  Route.resource('/pedido', 'PedidosController').apiOnly().except(['show'])
  Route.resource('/produto', 'ProdutosController').apiOnly().except(['index', 'show'])
  Route.resource('/restaurante', 'RestaurantesController').apiOnly()
  Route.resource('/tipoProduto', 'TipoProdutosController').apiOnly().except(['index', 'show'])
  Route.resource('/usuario', 'UsuariosController').apiOnly()
  Route.resource('/detalhesPedido', 'DetalhesPedidosController').apiOnly().except(['store','show'])
  Route.resource('/endereco', 'EnderecosController').apiOnly().except(['store', 'show', 'update', 'destroy'])
  Route.resource('/enderecoCliente', 'EnderecoClientesController').apiOnly().except(['store', 'show'])


}).prefix('/api')
*/

/*
//Grupo Auth Cliente e Admin
Route.group(()=>{
  Route.get('/cliente:id', 'ClientesController')
  Route.put('/cliente:id', 'ClientesController')
  Route.delete('/cliente:id', 'ClientesController')

  Route.get('/pedido:id', 'PedidosController')

  Route.get('/detalhesPedido:id', 'DetalhesPedidosController')
  Route.post('/detalhesPedido', 'DetalhesPedidosController')

  Route.resource('/endereco', 'EnderecosController').apiOnly().except(['index'])

  Route.get('/enderecoCliente:id', 'EnderecoClientesController')
  Route.post('/enderecoCliente', 'EnderecoClientesController')
  
}).prefix('/api')

*/

Route.group(() => {
  Route.resource('/cliente', 'ClientesController').apiOnly()
  /*Route.resource('/pedido', 'PedidosController').apiOnly()*/
  Route.resource('/produto', 'ProdutosController').apiOnly()
  Route.resource('/categoria', 'CategoriasController').apiOnly()
  Route.resource('/detalhesPedido', 'DetalhesPedidosController').apiOnly()
  Route.resource('/endereco', 'EnderecosController').apiOnly()
  Route.resource('/test', 'TestsController').apiOnly()
  Route.get('/enderecoAlternativa/:id', 'AlternativeEnderecosController.show')
  /*Route.get('/pedidoAlternativa/:id', 'AlternativePedidosController.show')*/
}).prefix('/api')

//Grupo sem Auth
Route.group(() => {
  Route.post('/login', 'AuthController.login')
}).prefix('/api')

Route.group(() => {
  Route.resource('/restaurante', 'RestaurantesController').apiOnly()
}).prefix('/api')

Route.post('/logout', async ({ auth }) => {
  await auth.use('api').revoke()
  return {
    revoked: true,
  }
}).prefix('/api')

Route.get('/pedido', 'PedidosController.index').prefix('/api').middleware('acl:admin')
Route.get('/pedido/:id', 'PedidosController.show').prefix('/api').middleware('acl:admin,cliente')
Route.get('/pedidoAlternativa/:id', 'AlternativePedidosController.show')
  .prefix('/api')
  .middleware('acl:admin,cliente')
Route.post('/pedido', 'PedidosController.store').prefix('/api').middleware('acl:admin,cliente')
Route.put('/pedido/:id', 'PedidosController.update').prefix('/api').middleware('acl:admin')
Route.delete('/pedido/:id', 'PedidosController.destroy').prefix('/api').middleware('acl:admin')
