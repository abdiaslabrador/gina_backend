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
import { Author } from "./Author"
import {PhotoMetadata} from "./PhotoMetadata"
import {Album} from "./Album"


@Entity()
export class Photo{

    @PrimaryGeneratedColumn()
    id:number
    
    @Column({
        length:100,
    })
    name:string

    @Column("text")
    descripcion:string

    @Column()
    filename:string

    @Column({
        type:"numeric",
        precision:12,
         scale: 2
       })
    views:number

    @Column()
    isPublished:boolean

    @OneToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photo, {
        cascade: true,
    })
    metadata: PhotoMetadata

    @ManyToOne(() => Author, (author) => author.photos, {onDelete: 'CASCADE'})
    @JoinColumn()
    author: Author

    @ManyToMany(() => Album, (album) => album.photos, {cascade: true,})
    albums: Album[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date

    @DeleteDateColumn()
    deleteAt: Date
}