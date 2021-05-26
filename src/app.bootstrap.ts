/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { createConnection } from 'typeorm';
import { Article } from './models/article.model';
import { Category } from './models/category.model';
import { User } from './models/user.model';

const initApp = async () => {
    try {
        const connexion = await createConnection({
            type: 'mysql',
            username: 'root',
            password: 'test',
            host: 'localhost',        
            port: 3306,
            database: 'fullstack_example',
            synchronize: true,
            entities:[Article, User, Category]
        });
        console.log('connection etablished !');
          
    } catch (e) {
        console.log(e);
    }
};

initApp();
