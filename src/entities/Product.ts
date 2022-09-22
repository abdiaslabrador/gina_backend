import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Producto extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"varchar"})
    product_name: string;

    @Column({type:"text"})
    description: string;

    @Column({
        type:"numeric",
        precision:12,
         scale: 2
       })
    bs_price: number;

    @Column({
         type:"numeric",
         precision:12,
         scale: 2
        })
    ds_price: number;


    @Column()
    cant: number;

}