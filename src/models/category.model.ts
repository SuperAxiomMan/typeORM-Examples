/* eslint-disable no-warning-comments */
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Article } from './article.model';
import { BaseModel } from './base.model';

@Entity()
export class Category extends BaseModel {
    @Column('varchar', {
        nullable: false
    })
    public name!: string;

    // TODO : slugify
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