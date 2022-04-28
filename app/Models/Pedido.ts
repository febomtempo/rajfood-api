import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Restaurante from './Restaurante'
import Produto from './Produto'

export default class Pedido extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_cliente: number

  @column()
  public id_restaurante: number

  @column()
  public total: number

  @column()
  public forma_pagamento: number

  @column()
  public status: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Cliente, {
    localKey: 'id_cliente'
  })
  public clientes: BelongsTo<typeof Cliente>

  @belongsTo(()=> Restaurante, {
    localKey: 'id_restaurante'
  })
  public restaurantes: BelongsTo<typeof Restaurante>

  @manyToMany(() => Produto)
  public produtos: ManyToMany<typeof Produto>

}
