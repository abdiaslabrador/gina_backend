import {OneToOne,
    Entity,
    JoinColumn,
    Column,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    ManyToMany} from "typeorm";

import {Document} from "./Document";

@Entity()
export class Bill{

@PrimaryGeneratedColumn()
id:number

@ManyToOne(() => Document, (document) => document.docu_bill, {onDelete: 'CASCADE'})
docu: Document

@CreateDateColumn()
createdAt: Date

@UpdateDateColumn()
updateAt: Date

@DeleteDateColumn()
deleteAt: Date

}        