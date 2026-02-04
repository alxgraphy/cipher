"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Null = exports.Boolean = exports.Integer = exports.ObjectType = void 0;
// Represents the type of an object in our language
var ObjectType;
(function (ObjectType) {
    ObjectType["INTEGER_OBJ"] = "INTEGER";
    ObjectType["BOOLEAN_OBJ"] = "BOOLEAN";
    ObjectType["NULL_OBJ"] = "NULL";
})(ObjectType || (exports.ObjectType = ObjectType = {}));
// Represents an integer object
class Integer {
    constructor(value) {
        this.value = value;
    }
    type() {
        return ObjectType.INTEGER_OBJ;
    }
    inspect() {
        return this.value.toString();
    }
}
exports.Integer = Integer;
// Represents a boolean object
class Boolean {
    constructor(value) {
        this.value = value;
    }
    type() {
        return ObjectType.BOOLEAN_OBJ;
    }
    inspect() {
        return this.value.toString();
    }
}
exports.Boolean = Boolean;
// Represents the null object
class Null {
    type() {
        return ObjectType.NULL_OBJ;
    }
    inspect() {
        return "null";
    }
}
exports.Null = Null;
