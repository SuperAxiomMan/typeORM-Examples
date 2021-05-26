import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

class BaseModel{

    @PrimaryGeneratedColumn('increment')
    public id!: number;
    
    @CreateDateColumn()
    public creationDate!:Date;

    @UpdateDateColumn()
    public updateDate!:Date;

    @DeleteDateColumn()
    public deleteDate?:Date;
}

export{BaseModel};