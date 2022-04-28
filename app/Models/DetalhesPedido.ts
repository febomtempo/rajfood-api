import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Pedido from './Pedido'
import Produto from './Produto'

export default class DetalhesPedido extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_pedido: number

  @column()
  public id_produto: number

  @column()
  public quantidade: number

  @column()
  public valor_total_item: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Pedido, {
    localKey: 'id_pedido'
  })
  public detalhe_pedido: BelongsTo<typeof Pedido>

  @belongsTo(()=> Produto, {
    localKey: 'id_produto'
  })
  public detalhe_produto: BelongsTo<typeof Produto>
}
