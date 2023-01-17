import {OneToOne,
    Entity,
    JoinColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    ManyToMany} from "typeorm"

import {Appointment} from "./Appointment"
import {Patient} from "./Patient"

@Entity()
export class AppointmentHistory{

@PrimaryGeneratedColumn()
id:number

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date

@OneToMany(() => Appointment, (appointment:Appointment)=>appointment.appointmentHistory, {cascade: true})
appointments: Appointment[]

@OneToOne(() => Patient, (patient:Patient)=>patient.appointmentHistory, {onDelete: 'CASCADE'})
@JoinColumn()
patient: Patient
}