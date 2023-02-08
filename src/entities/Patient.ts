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
        ManyToMany,
        BaseEntity} from "typeorm"

import {PatientBackground} from "./PatientBackground"
import {AppointmentHistory} from "./AppointmentHistory"
import {Odontograma} from "./Odontograma"
    
@Entity()
export class Patient extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({length:128})
    name:string

    @Column({length:128})
    last_name:string

    @Index({ unique: true })
    @Column({length:64})
    ci_rif:string

    @Column({length:64})
    sex:string
    
    @Column()
    birthday:Date
    
    @Column({length:64, nullable:true})
    phone_number:string

    @Column({type:"text", nullable:true})
    direction:string
    
    @OneToOne(() => PatientBackground, (patientbackground:PatientBackground) => patientbackground.patient, {cascade: true,})
    background : PatientBackground;

    @OneToOne(() => AppointmentHistory, (appointmentHistory:AppointmentHistory) => appointmentHistory.patient, {cascade: true,})
    appointmentHistory : AppointmentHistory;

    @OneToOne(() => Odontograma, (odontograma:Odontograma) => odontograma.patient, {cascade: true,})
    odontograma : Odontograma;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @DeleteDateColumn()
    deleteAt: Date
}