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

import {User} from "./User"


@Entity()
export class UserBackground{

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

@OneToOne(() => User, (user:User)=>user.userbackground )
user: User

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date

// @OneToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photo, {
//     cascade: true,
// })
}        