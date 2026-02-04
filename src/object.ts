// Represents the type of an object in our language
export enum ObjectType {
  INTEGER_OBJ = "INTEGER",
  BOOLEAN_OBJ = "BOOLEAN",
  NULL_OBJ = "NULL",
}

// Base interface for all objects in our language
export interface BaseObject {
  type(): ObjectType;
  inspect(): string;
}

// Represents an integer object
export class Integer implements BaseObject {
  constructor(public value: number) {}

  type(): ObjectType {
    return ObjectType.INTEGER_OBJ;
  }

  inspect(): string {
    return this.value.toString();
  }
}

// Represents a boolean object
export class Boolean implements BaseObject {
  constructor(public value: boolean) {}

  type(): ObjectType {
    return ObjectType.BOOLEAN_OBJ;
  }

  inspect(): string {
    return this.value.toString();
  }
}

// Represents the null object
export class Null implements BaseObject {
  type(): ObjectType {
    return ObjectType.NULL_OBJ;
  }

  inspect(): string {
    return "null";
  }
}
