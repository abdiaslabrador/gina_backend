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

    @Column({length:64, nullable:true})
    phone_number:string

    @Column({length:64})
    sex:string

    @Column()
    birthday:Date

    @Column({type:"text", nullable:true})
    direction:string

    @Column({length:264, nullable:true})
    email:string
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @DeleteDateColumn()
    deleteAt: Date
    
    @OneToOne(() => PatientBackground, (patientbackground:PatientBackground) => patientbackground.patient, {cascade: true,})
    patientbackground : PatientBackground;
}