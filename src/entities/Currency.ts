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
    ManyToMany} from "typeorm"


@Entity()
export class Currency{

@PrimaryGeneratedColumn()
id:number

@Column({length:128})
name:string

@Column("decimal", { precision: 12, scale: 2 })
today_currency:number

@Column()
active:boolean

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date

}        