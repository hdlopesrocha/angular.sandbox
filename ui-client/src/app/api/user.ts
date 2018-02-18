// Generated using typescript-generator version 2.1.406 on 2018-02-18 02:11:55.

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
    data: { [index: string]: string };
}

export class EntityData extends Entity {
    data: { [index: string]: any };
}

export class Membership extends Entity {
    to: string;
}

export enum CredentialsType {
    EMAIL = "EMAIL",
    GOOGLE = "GOOGLE",
    FACEBOOK = "FACEBOOK",
}
