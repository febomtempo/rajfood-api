import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Restaurante from './Restaurante'
import Pedido from './Pedido'

export default class Pagamento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_restaurante: number

  @column()
  public id_pedido: number

  @column()
  public valor: number

  @column()
  public pagante: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Restaurante, {
    localKey: 'id_restaurante'
  })
  public restaurantes: BelongsTo<typeof Restaurante>

  @belongsTo(()=> Pedido, {
    localKey: 'id_pedido'
  })
  public pedidos: BelongsTo<typeof Pedido>
}
