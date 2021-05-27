import { EntityRepository, Repository } from 'typeorm';
import { Article } from '../models/article.model';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {

    async exists(id: number) {
        const tableName = this.metadata.tableName;
        const article = await this.query(`SELECT id FROM ${tableName} WHERE id=?`, [id]);

        if (article.length) {
            return true;
        }
        return false;
    }

}