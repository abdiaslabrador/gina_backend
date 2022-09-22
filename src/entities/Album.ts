import {
    Entity, Column, PrimaryGeneratedColumn,
     JoinTable,  ManyToMany,
     CreateDateColumn,
       UpdateDateColumn,
       DeleteDateColumn,
        } from "typeorm"
import { Photo } from "./Photo"

@Entity()
export class Album{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string

    @ManyToMany(() => Photo, (photo) => photo.albums)
    @JoinTable() //is required
    photos: Photo[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @DeleteDateColumn()
    deleteAt: Date
}