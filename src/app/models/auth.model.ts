import { Person } from './person.model';

export interface AuthModel{

    isAuthenticated: boolean;
    person: Person

}