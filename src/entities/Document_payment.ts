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
import {PaymentType} from "./PaymentType";

@Entity()
export class Document_payment{

@PrimaryGeneratedColumn()
id:number

@Column()
payment_date:Date

@Column("decimal", { precision: 12, scale: 2, nullable:true })
currency_day_value:number

@Column("decimal", { precision: 12, scale: 2, nullable:true })
currency_amount:number

@Column("decimal", { precision: 12, scale: 2 })
amount:number

@Column({type:"text", nullable:true})
detail: string;

@ManyToOne(() => Document, (document) => document.docu_payments, {onDelete: 'CASCADE'})
docu: Document

@ManyToOne(() => PaymentType, (payment) => payment.docu_payments, {onDelete: 'CASCADE'})
payment: PaymentType

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date

}        