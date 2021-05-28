/* eslint-disable no-console */
import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm';
import { User } from '../models/user.model';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    beforeInsert(event: UpdateEvent<User>) {
        console.log('BEFORE POST INSERTED: ', event.entity);
    }
}