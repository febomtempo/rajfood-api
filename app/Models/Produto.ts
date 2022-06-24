import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  computed,
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
    pivotColumns: ['quantidade', 'valor_total_item'],
  })
  public produtos: ManyToMany<typeof Pedido>

  @computed()
  public get pivot_quantidade() {
    return this.$extras.pivot_quantidade
  }

  @computed()
  public get pivot_valor_total_item() {
    return this.$extras.pivot_valor_total_item
  }
}
