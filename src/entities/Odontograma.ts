import {OneToOne,
    Entity,
    JoinColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    ManyToMany} from "typeorm"

import {Patient} from "./Patient"
import { Tooth } from "./Tooth"



@Entity()
export class Odontograma{

@PrimaryGeneratedColumn()
id:number

@OneToOne(() => Patient, (patient:Patient)=>patient.odontograma, {onDelete: 'CASCADE'})
@JoinColumn()
patient: Patient

@OneToMany(() => Tooth, (tooth:Tooth) => tooth.odontograma, { cascade: true })
teeth: Tooth[]

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date
}