// src/domain/permissions/role-permissions.ts

import { UserRole } from '@domain/entities/user/user-role';
import { UserPermissions } from './user-permissions';
import { OrderPermissions } from './order-permissions';

export class RolePermissions {
  private static permissions: Record<
    string, // UserRole as string
    { [key: string]: string[] }
  > = {
    [UserRole.ADMIN]: {
      user: [
        UserPermissions.CREATE_USER,
        UserPermissions.READ_USER,
        UserPermissions.UPDATE_USER,
        UserPermissions.DELETE_USER,
      ],
      order: [
        OrderPermissions.CREATE_ORDER,
        OrderPermissions.READ_ORDER,
        OrderPermissions.UPDATE_ORDER,
        OrderPermissions.DELETE_ORDER,
        OrderPermissions.APPROVE_ORDER,
      ],
    },
    [UserRole.MANAGER]: {
      user: [UserPermissions.READ_USER],
      order: [OrderPermissions.READ_ORDER, OrderPermissions.UPDATE_ORDER],
    },
    [UserRole.USER]: {
      user: [UserPermissions.READ_USER],
      order: [OrderPermissions.READ_ORDER],
    },
  };

  // Method to check if the role has a specific permission for an entity
  public static hasPermission(
    role: UserRole,
    entity: string,
    permission: string
  ): boolean {
    const entityPermissions = this.permissions[role.getValue()]?.[entity];
    return entityPermissions ? entityPermissions.includes(permission) : false;
  }
}
