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

import { Odontograma } from "./Odontograma";
import { ToothParts } from "./ToothParts";

@Entity()
export class Tooth{

@PrimaryGeneratedColumn()
id:number

@Column()
number:number

@Column({nullable:true})
e: string

@Column({nullable:true})
m: string

@Column({default:false})
question: boolean

@Column({nullable:true})
line: string

@Column({nullable:true})
circle: string

@Column({nullable:true})
ring: string

@Column({nullable:true})
x: string

@ManyToOne(() => Odontograma, (odontograma:Odontograma) => odontograma.teeth, {onDelete: 'CASCADE'})
odontograma: Odontograma

@OneToOne(() => ToothParts, (toothParts:ToothParts) => toothParts.tooth, {cascade: true,})
toothParts : ToothParts;

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date

}        