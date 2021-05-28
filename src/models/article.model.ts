/* eslint-disable no-console */
import slugify from 'slugify';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
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

    

    @BeforeInsert()
    @BeforeUpdate()
    public slugifyBefore() {
        console.log(this.title);
        this.slug = slugify(this.title);
    }

    @Column('varchar', {
        nullable: false,
        unique: true
    })
    
    public slug!: string;

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