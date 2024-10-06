"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDTO = void 0;
class CreateUserDTO {
    constructor({ username, email, password, role, phoneNumber }) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.phoneNumber = phoneNumber;
    }
}
exports.CreateUserDTO = CreateUserDTO;
