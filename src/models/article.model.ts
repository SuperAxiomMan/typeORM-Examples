import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { Category } from './category.model';
import { User } from './user.model';

@Entity()
export class Article extends BaseModel {
    @Column('varchar', {
        nullable: false,
        length: 64
    })
    public title!: string;

    @Column('text', {
        nullable: false
    })
    public content!: string;

    @ManyToOne(() => User, (user) => user.articles, {
        nullable: false
    })
    public author!: User;

    @ManyToMany(() => Category, (category) => category.articles)
    public categories?: Category[];
}