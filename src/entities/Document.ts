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

import {Client} from "./Client";
import {Document_det} from "./Document_det";
import {Document_payment} from "./Document_payment";
import {Bill} from "./Bill";

@Entity()
export class Document{

@PrimaryGeneratedColumn()
id:number

@Column()
document_date:Date

@Column("decimal", { precision: 12, scale: 2 })
currency_day_value:number

@Column("decimal", { precision: 12, scale: 2 })
subtotal:number

@Column("decimal", { precision: 12, scale: 2 })
discount:number

@Column("decimal", { precision: 12, scale: 2 })
total:number

@Column("decimal", { precision: 12, scale: 2 })
total_payed:number

@Column("decimal", { precision: 12, scale: 2 })
change:number

@Column({type:"boolean", default: false })
canceled:boolean

@ManyToOne(() => Client, (client) => client.documents, {onDelete: 'CASCADE'})
client: Client

@OneToMany(() => Document_det, (document_det) => document_det.docu, { cascade: true })
docu_dets: Document_det

@OneToMany(() => Document_payment, (document_payment) => document_payment.docu, { cascade: true })
docu_payments: Document_payment

@OneToMany(() => Bill, (bill) => bill.docu, { cascade: true })
docu_bill: Bill


@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date

}        