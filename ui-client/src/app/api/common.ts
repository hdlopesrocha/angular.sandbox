// Generated using typescript-generator version 2.1.406 on 2018-03-17 13:42:34.

export class Command {
}

export class CommandResult<T> {
    result: T;
    errors: { [index: string]: Error };
}

export class Error {
    message: string;
    args: any;
}
