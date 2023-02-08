import {OneToOne,
    Entity,
    JoinColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany} from "typeorm"

import {Patient} from "./Patient"


@Entity()
export class PatientBackground{

@PrimaryGeneratedColumn()
id:number

@Column({type:"text", nullable:true}) //reacción medicamentosa
rm:string

@Column({type:"text", nullable:true}) //antecedentes patológicos personales
app:string

@Column({type:"text", nullable:true}) //antecedentes hemorágicos
ah:string

@Column({type:"text", nullable:true}) //antecedentes patológicos familiares
apf:string

@Column({type:"text", nullable:true})
habits:string

@Column({default:false, nullable:true})
need_child_edentigrama:boolean

@OneToOne(() => Patient, (patient:Patient)=>patient.background, {onDelete: 'CASCADE'})
@JoinColumn()
patient: Patient

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date
}