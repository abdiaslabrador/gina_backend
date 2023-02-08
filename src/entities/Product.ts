import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, 
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, 
    Index,
    OneToMany} from "typeorm";

import {Document_det} from "./Document_det";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column({length:10})
    code:string;

    @Column({default: 0})
    cant: number;

    @Column({type:"text"})
    description: string;

    @Column({
        type:"decimal",
        precision:12,
        scale: 2
       })
    price: number;

    @Column({
         type:"decimal",
         precision:12,
         scale: 2
        })
    price_ref: number;

    @Column({type:"boolean", default: true })
    admit_update_currency:boolean;

    @Column({type:"boolean", default: true })
    enable_cant:boolean;
    
    @OneToMany(() => Document_det, (document_det) => document_det.product, { cascade: true })
    docu_dets: Document_det

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}