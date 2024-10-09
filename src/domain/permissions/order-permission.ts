// src/domain/permissions/order-permissions.ts

export enum OrderPermissionsEnum {
  CREATE_ORDER = 'createOrder',
  READ_ORDER = 'readOrder',
  UPDATE_ORDER = 'updateOrder',
  DELETE_ORDER = 'deleteOrder',
  APPROVE_ORDER = 'approveOrder', // Example of custom permission
}
