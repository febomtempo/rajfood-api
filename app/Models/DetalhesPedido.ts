import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DetalhesPedido extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public pedidoId: number

  @column()
  public produtoId: number

  @column()
  public quantidade: number

  @column()
  public valor_total_item: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
