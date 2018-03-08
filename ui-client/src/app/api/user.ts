// Generated using typescript-generator version 2.1.406 on 2018-03-08 22:14:04.

export class Command {
}

export class AuthenticateViaEmailPassword extends Command {
    email: string;
    password: string;
}

export class RegisterUserViaEmail extends Command {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
}

export class Entity {
    id: string;
}

export class Credentials extends Entity {
    type: CredentialsType;
    data: { [index: string]: any };
}

export class EntityData extends Entity {
    data: { [index: string]: any };
}

export class Membership extends Entity {
    to: string;
}

export class SimpleAuthentication implements Authentication {
    name: string;
    authorities: GrantedAuthority[];
    details: any;
    credentials: any;
    authenticated: boolean;
    principal: any;
}

export interface GrantedAuthority extends Serializable {
    authority: string;
}

export interface Authentication extends Principal, Serializable {
    authorities: GrantedAuthority[];
    details: any;
    credentials: any;
    authenticated: boolean;
    principal: any;
}

export interface Serializable {
}

export interface Principal {
    name: string;
}

export enum CredentialsType {
    EMAIL = "EMAIL",
    GOOGLE = "GOOGLE",
    FACEBOOK = "FACEBOOK",
}
