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
        ManyToMany} from "typeorm"

import {Patient} from "./Patient"


@Entity()
export class Employee{

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

    @Column()
    birthday:Date

    @Column({type:"text", nullable:true})
    direction:string

    @Index({ unique: true })
    @Column({length:264, nullable:true})
    email:string

    @Column({length:264})
    password:string
    
    @Column({type:"boolean", default: true })
    active:boolean

    @Column({type:"boolean", default: true })
    secretary:boolean

    @Column({type:"boolean", default: false })
    superuser:boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @DeleteDateColumn()
    deleteAt: Date

}        