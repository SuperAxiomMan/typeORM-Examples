/* eslint-disable no-console */
import { AfterLoad, BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { Article } from './article.model';
import { BaseModel } from './base.model';

@Entity()
export class User extends BaseModel {

    @Column('varchar', {
        nullable: false
    })
    public firstName!: string;

    @Column('varchar', {
        nullable: false
    })
    public lastName!: string;

    @OneToMany(() => Article, (article) => article.author)
    public articles?: Article[];

    @AfterLoad()
    public afterTheLoad() {
        console.log('Created', this);
    }

    @BeforeInsert()
    @BeforeUpdate()
    @BeforeRemove()

    public beforeTheInsert() {
        this.firstName += ' Extra Name';
        console.log('Before Insert : ', this);
    }

    /**
     * virtual prop
     */
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}