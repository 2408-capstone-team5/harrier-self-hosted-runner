"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoles = void 0;
/*
    assumes:
    - harrier_identity user exists with minimum user role permissions

    using the `harrier_identity` user, setup resource-related roles
    - ec2 can access s3
    - lambda basic execution role
    - cache eviction lambda needs s3 access
   */
const setupRoles = () => { };
exports.setupRoles = setupRoles;
