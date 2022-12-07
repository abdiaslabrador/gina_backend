import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, 
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, 
    Index} from "typeorm";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column({length:10})
    code:string;

    @Column()
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
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
}