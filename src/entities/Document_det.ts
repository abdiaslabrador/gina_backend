import {OneToOne,
    Entity,
    JoinColumn,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    ManyToMany} from "typeorm";

import {Document} from "./Document";
import {Product} from "./Product";

@Entity()
export class Document_det{

@PrimaryGeneratedColumn()
id:number

@Column()
cant:number

@Column("decimal", { precision: 12, scale: 2 })
price_ref:number

@Column("decimal", { precision: 12, scale: 2 })
price_sold:number

@Column("decimal", { precision: 12, scale: 2 })
subtotal:number

@ManyToOne(() => Document, (document) => document.docu_dets, {onDelete: 'CASCADE'})
docu: Document

@ManyToOne(() => Product, (product) => product.docu_dets, {onDelete: 'CASCADE'})
product: Product

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date

}        