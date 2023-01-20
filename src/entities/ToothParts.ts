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

@Column()
number:number

@Column({nullable:true})
point: string

@ManyToOne(() => Tooth, (tooth) => tooth.toothParts, {onDelete: 'CASCADE'})
tooth: Tooth

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date

}        