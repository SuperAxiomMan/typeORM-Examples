/* eslint-disable no-warning-comments */
import slugify from 'slugify';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Article } from './article.model';
import { BaseModel } from './base.model';

@Entity()
export class Category extends BaseModel {
    @Column('varchar', {
        nullable: false
    })
    public name!: string;

    @BeforeInsert()
    @BeforeUpdate()
    public slugifyBefore() {
        this.slug = slugify(this.name);
    }

    @Column('varchar', {
        nullable: false,
        unique: true
    })
    
    @Column('varchar', {
        nullable: false,
        unique: true
    })
    public slug!: string;

    @ManyToMany(() => Article, (article) => article.categories)
    @JoinTable({
        name: 'categories_articles'
    })
    public articles?: Article[];
}