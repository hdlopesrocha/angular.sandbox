// Generated using typescript-generator version 2.1.406 on 2018-03-27 00:18:08.

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

export class Address extends Entity {
    owner: string;
    country: Country;
    city: string;
    postalCode: string;
    addressLine1: string;
    addressLine2: string;
    comment: string;
    phone: string;
}

export class Bill extends Entity {
    address: Address;
    owner: string;
    state: BillState;
    billHistory: BillStateHistory[];
    trackingNumber: string;
    currency: Currency;
    cart: Cart;
    prices: { [index: string]: number };
}

export class BillItem {
    productId: string;
    price: number;
    amount: number;
}

export class BillStateHistory {
    state: BillState;
    date: Date;
}

export class Cart extends Entity {
    amounts: { [index: string]: number };
}

export class Credentials extends Entity {
    owner: string;
    type: CredentialsType;
    data: { [index: string]: any };
}

export class EntityData extends Entity {
    data: { [index: string]: any };
}

export class Membership extends Entity {
    to: string;
    from: string;
}

export class Product extends Entity {
    attachments: string[];
    price: { [index: string]: number };
    title: { [index: string]: string };
    description: { [index: string]: string };
}

export enum BillState {
    CREATED = "CREATED",
    CONFIRMED = "CONFIRMED",
    PAID = "PAID",
    SENT = "SENT",
    FINISHED = "FINISHED",
    DELETED = "DELETED",
}

export enum Country {
    FR = "FR",
    GB = "GB",
    CH = "CH",
    BE = "BE",
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

export enum Lang {
    EN = "EN",
    FR = "FR",
    PT = "PT",
    CN = "CN",
}
