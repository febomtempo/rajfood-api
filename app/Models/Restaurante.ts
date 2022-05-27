import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Usuario from './Usuario'
import Pedido from './Pedido'

export default class Restaurante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_usuario: number

  @column()
  public nome: string

  @column()
  public descricao: string

  @column()
  public fone: string

  @column()
  public endereco: string

  @column()
  public aberto: boolean

  @column()
  public valorEnvio: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Usuario, {
    localKey: 'id_usuario',
  })
  public usuarios: BelongsTo<typeof Usuario>

  @hasMany(() => Pedido, {
    foreignKey: 'id_restaurante',
  })
  public restaurantes: HasMany<typeof Pedido>
}
