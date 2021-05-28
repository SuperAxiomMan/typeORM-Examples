/* eslint-disable no-console */

import { getCustomRepository, getRepository, LessThan } from 'typeorm';
import { User } from '../models/user.model';
import { ArticleRepository } from '../repositories/article.repository';

export class Queries {

    static async findAll() {
        const userRepository = getRepository(User /*"default"*/);

        const user = await userRepository.find({
            where: {
                // WHERE id < 10
                id: LessThan(10)
            },
            select: ['firstName', 'lastName', 'id'], // sélectionne uniquement le nom + prénom
            order: {
                // trie par id en Ascendant
                id: 'ASC'
            },
            relations: ['articles'] // va faire un left join sur la relation articles
        });

        console.table(user); // => c'est cool pour voir les tableaux
    }


    static async findOne() {
        // récupère le repo User
        const userRepository = getRepository(User);
        // va chercher automatiquement l'utilisateur avec l'id 1
        const user = await userRepository.findOne(1);

        if (user) {
            console.log(user);
            console.log(user.fullName);
        } else {
            throw new Error('USER NOT FOUND');
        }
    }

    static async create(firstName: string, lastName: string) {
        const userRepository = getRepository(User);
        const newUser = await userRepository.create({
            firstName, lastName
        });

        await userRepository.save(newUser);

        console.log(newUser);

    }

    static async createAdvanced(firstName: string, lastName: string) {
        const userRepository = getRepository(User);

        const newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;

        await userRepository.save(newUser);

        console.log();
        console.log(newUser);


    }

    static async update(id:number, firstName: string, lastName: string){
        const userRepository = getRepository(User);

        const userID = await userRepository.findOne(id);
        if (userID) {
            userID.firstName =firstName; 
            userID.lastName =lastName; 

        await userRepository.save(userID);
        }
    }

    static async updatePreload(id:number, firstName: string, lastName: string){
        const userRepository = getRepository(User);

       const loadedAndMergedUser = await userRepository.preload({
            id,
            firstName,
            lastName
        });

        if (loadedAndMergedUser) {
            loadedAndMergedUser.firstName =firstName; 
            loadedAndMergedUser.lastName =lastName; 

        await userRepository.save(loadedAndMergedUser);

        }
    }

    static async updatePreloadRaw(id:number, firstName: string, lastName: string){
        const userRepository = getRepository(User);
        userRepository.update(id, {
            firstName,
            lastName
        });
    }

    static async remove(id:number){
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(id);

        if (user) {
        await userRepository.remove(user);
        }
    }

    static async softremove(id:number){
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(id);

        if (user) {
        await userRepository.softRemove(user);
        }
    }

    static async userExists(){
        console.log(await getCustomRepository(ArticleRepository).exists(1));
    }

    static async qbUserArticle(){
        const queryBuilder = getRepository(User).createQueryBuilder('users');

        const users = await queryBuilder
        .select()
            .leftJoinAndSelect('users.articles', 'user_articles')
            .where('user_articles.author = :id', {
                id: 1
            }).getMany();


        for (const user of users) {
            const result = `${user.fullName }:${ user.articles?.map(e=>e.title)}`;
            console.log(result);
        }
    }


}
