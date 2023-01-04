import {OneToOne,
    Entity,
    JoinColumn,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    ManyToMany} from "typeorm";
import {Currency} from "./Currency";
import {Document_payment} from "./Document_payment";
@Entity()
export class PaymentType{

@PrimaryGeneratedColumn()
id:number

@Column({length:128})
name:string

@Column({type:"boolean", default: true })
active:boolean

@Column({length:64})
type:string

@ManyToOne(() => Currency, (currency) => currency.paymentType, {onDelete: 'CASCADE'})
currency: Currency

@OneToMany(() => Document_payment, (payment) => payment.payment, { cascade: true })
docu_payments: Document_payment

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date

}        