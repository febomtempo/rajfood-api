import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Pedido from './Pedido'
import Categoria from './Categoria'

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_categoria: number

  @column()
  public nome: string

  @column()
  public preco: number

  @column()
  public descricao: string

  @column()
  public ativo: boolean

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Categoria, {
    localKey: 'id_categoria',
  })
  public categoria: BelongsTo<typeof Categoria>

  @manyToMany(() => Pedido, {
    pivotTable: 'detalhes_pedidos',
  })
  public produtos: ManyToMany<typeof Pedido>
}
