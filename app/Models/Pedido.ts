import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Restaurante from './Restaurante'
import Produto from './Produto'
import Endereco from './Endereco'

export default class Pedido extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_cliente: number

  @column()
  public id_restaurante: number

  @column()
  public id_endereco: number

  @column()
  public total: number

  @column()
  public forma_pagamento: number

  @column()
  public troco: number

  @column()
  public status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cliente, {
    foreignKey: 'id_cliente',
    localKey: 'id',
  })
  public clientes: BelongsTo<typeof Cliente>

  @belongsTo(() => Restaurante, {
    localKey: 'id_restaurante',
  })
  public restaurantes: BelongsTo<typeof Restaurante>

  @belongsTo(() => Endereco, {
    foreignKey: 'id_endereco',
    localKey: 'id',
  })
  public endereco: BelongsTo<typeof Endereco>

  @manyToMany(() => Produto, {
    pivotTable: 'detalhes_pedidos',
    pivotColumns: ['quantidade', 'valor_total_item'],
  })
  public produtos: ManyToMany<typeof Produto>
}
