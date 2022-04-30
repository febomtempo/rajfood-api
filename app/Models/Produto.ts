import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import TipoProduto from './TipoProduto'
import Pedido from './Pedido'


export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_tipo_produto: number

  @column()
  public nome: string

  @column()
  public precoP: number

  @column()
  public precoM: number

  @column()
  public precoG: number

  @column()
  public descricao: string

  @column()
  public status: boolean

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> TipoProduto, {
    localKey: 'id_tipo_produto'
  })
  public tipoProdutos: BelongsTo<typeof TipoProduto>

  @manyToMany(() => Pedido)
  public produtos: ManyToMany<typeof Pedido>
  
}
