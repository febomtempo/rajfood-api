import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import Endereco from './Endereco'

export default class EnderecoCliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_endereco: number

  @column()
  public id_cliente: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Endereco, {
    localKey: 'id_endereco'
  })
  public endereco_cliente: BelongsTo<typeof Endereco>

  @belongsTo(()=> Cliente, {
    localKey: 'id_cliente'
  })
  public cliente_endereco: BelongsTo<typeof Cliente>
}
