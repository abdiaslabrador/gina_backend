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

@Column("text") //reacción medicamentosa
rm:string

@Column("text") //antecedentes patológicos personales
app:string

@Column("text") //antecedentes hemorágicos
ah:string

@Column("text") //antecedentes patológicos familiares
apf:string

@Column("text")
habitos:string

@Column()
need_child_edentigrama:boolean

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date

@OneToOne(() => Patient, (patient:Patient)=>patient.patientbackground, {onDelete: 'CASCADE'})
@JoinColumn()
patient: Patient
}        