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
    import {Patient} from "./Patient"
    import { AppointmentHistory } from "./AppointmentHistory"

@Entity()
export class Appointment{

@PrimaryGeneratedColumn()
id:number

@Column({type:"text", nullable:true})
appointment_date:Date

@Column({type:"text", nullable:true})
reason:string

@Column({type:"text", nullable:true})
description:string

@ManyToOne(() => AppointmentHistory, (appointmentHistory) => appointmentHistory.appointments, {onDelete: 'CASCADE'})
appointmentHistory: AppointmentHistory

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date
}