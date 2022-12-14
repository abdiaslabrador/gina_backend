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

import {PaymentType} from "./PaymentType";

@Entity()
export class Currency{

@PrimaryGeneratedColumn()
id:number

// @Column({length:64, nullable:true})
// code:string

@Column({length:128})
name:string

@Column("decimal", { precision: 12, scale: 2 })
today_currency:number

@Column({type:"boolean", default: true })
active:boolean

@OneToMany(() => PaymentType, (paymentType) => paymentType.currency, { cascade: true })
paymentType: PaymentType[]

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date

}        