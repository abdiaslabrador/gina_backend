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
import { Tooth } from "./Tooth";

@Entity()
export class ToothParts{

@PrimaryGeneratedColumn()
id:number

@Column({nullable:true})
one: string

@Column({nullable:true})
two: string

@Column({nullable:true})
three: string

@Column({nullable:true})
four: string

@Column({nullable:true})
five: string

@OneToOne(() => Tooth, (tooth:Tooth)=>tooth.toothParts, {onDelete: 'CASCADE'})
@JoinColumn()
tooth: Tooth

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date

}        