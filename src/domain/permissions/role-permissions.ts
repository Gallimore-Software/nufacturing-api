// src/domain/permissions/role-permissions.ts

import { UserRoleEnum } from '@domain/entities/user/user-role';
import { UserPermissionsEnum } from './user-permissions';
import { OrderPermissionsEnum } from './order-permissions';

export class RolePermissions {
  private static permissions: Record<
    UserRoleEnum,
    { [key: string]: string[] }
  > = {
    [UserRoleEnum.ADMIN]: {
      user: [
        UserPermissionsEnum.CREATE_USER,
        UserPermissionsEnum.READ_USER,
        UserPermissionsEnum.UPDATE_USER,
        UserPermissionsEnum.DELETE_USER,
      ],
      order: [
        OrderPermissionsEnum.CREATE_ORDER,
        OrderPermissionsEnum.READ_ORDER,
        OrderPermissionsEnum.UPDATE_ORDER,
        OrderPermissionsEnum.DELETE_ORDER,
        OrderPermissionsEnum.APPROVE_ORDER,
      ],
    },
    [UserRoleEnum.MANAGER]: {
      user: [UserPermissionsEnum.READ_USER],
      order: [
        OrderPermissionsEnum.READ_ORDER,
        OrderPermissionsEnum.UPDATE_ORDER,
      ],
    },
    [UserRoleEnum.USER]: {
      user: [UserPermissionsEnum.READ_USER],
      order: [OrderPermissionsEnum.READ_ORDER],
    },
    // Define other roles and their permissions here
  };

  // Method to check if the role has a specific permission for an entity
  public static hasPermission(
    role: UserRoleEnum,
    entity: string,
    permission: string
  ): boolean {
    const entityPermissions = this.permissions[role]?.[entity];
    return entityPermissions ? entityPermissions.includes(permission) : false;
  }
}
