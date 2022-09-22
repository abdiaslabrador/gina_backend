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

import {UserBackground} from "./UserBackground"
//otro cambio
@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number
    
    @Column({length:128})
    name:string

    @Column({length:128})
    last_name:string

    @Column({length:64})
    ci_rif:string

    @Column({length:64})
    sex:string

    @Column()
    birthday:Date

    @Column({length:64, nullable:true})
    ci_rif_optional:string

    @Column({length:64, nullable:true})
    phone_number:string

    @Column({type:"text", nullable:true})
    direccion:string

    @Index({ unique: true })
    @Column({length:264, nullable:true})
    email:string //cambio

    @Column({length:264, nullable:true})
    password:string
    
    @Column()
    active:boolean

    @Column()
    secretario:boolean

    @Column()
    superuser:boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @DeleteDateColumn()
    deleteAt: Date
    
    @OneToOne(() => UserBackground, (userbackground:UserBackground) => userbackground.user, {
        cascade: true,
    })
    @JoinColumn()
    userbackground : UserBackground
}        