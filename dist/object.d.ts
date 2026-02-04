export declare enum ObjectType {
    INTEGER_OBJ = "INTEGER",
    BOOLEAN_OBJ = "BOOLEAN",
    NULL_OBJ = "NULL"
}
export interface BaseObject {
    type(): ObjectType;
    inspect(): string;
}
export declare class Integer implements BaseObject {
    value: number;
    constructor(value: number);
    type(): ObjectType;
    inspect(): string;
}
export declare class Boolean implements BaseObject {
    value: boolean;
    constructor(value: boolean);
    type(): ObjectType;
    inspect(): string;
}
export declare class Null implements BaseObject {
    type(): ObjectType;
    inspect(): string;
}
//# sourceMappingURL=object.d.ts.map