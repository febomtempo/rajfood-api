import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Pedido from './Pedido'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_cliente: number

  @column()
  public descricao: string

  @column()
  public cep: string

  @column()
  public rua: string

  @column()
  public bairro: string

  @column()
  public cidade: string

  @column()
  public estado: string

  @column()
  public numero: string

  @column()
  public complemento: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Cliente, {
    localKey: 'id_cliente',
  })
  public clientes: BelongsTo<typeof Cliente>

  @hasMany(() => Pedido, {
    foreignKey: 'id_endereco',
  })
  public pedidos: HasMany<typeof Pedido>
}
