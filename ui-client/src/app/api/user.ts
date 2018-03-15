// Generated using typescript-generator version 2.1.406 on 2018-03-15 23:05:28.

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

export class Product extends Entity {
    images: string[];
    price: { [index: string]: number };
    title: string;
    decription: string;
}

export enum CredentialsType {
    EMAIL = "EMAIL",
    GOOGLE = "GOOGLE",
    FACEBOOK = "FACEBOOK",
}

export enum Currency {
    USD = "USD",
    EUR = "EUR",
    GBP = "GBP",
    BTC = "BTC",
    ETH = "ETH",
    LTC = "LTC",
    XMR = "XMR",
}
