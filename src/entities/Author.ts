import {
    Entity, Column, PrimaryGeneratedColumn,
    OneToOne, JoinColumn, Relation, OneToMany
        } from "typeorm"
import { Photo } from "./Photo"

@Entity()
export class Author{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string

    @OneToMany(() => Photo, (photo) => photo.author, { cascade: true })
    photos: Photo[]
}
