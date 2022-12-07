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


@Entity()
export class Client{

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

    @Column({type:"text", nullable:true})
    direction:string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @DeleteDateColumn()
    deleteAt: Date

}        