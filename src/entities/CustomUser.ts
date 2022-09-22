import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class CustomUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:true})
    firstName: string

    @Column({nullable:true})
    lastName: string

    @Column({nullable:true})
    age: number
}