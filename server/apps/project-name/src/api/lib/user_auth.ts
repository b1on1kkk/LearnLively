import type { findUserByIdPayload } from '../interfaces/findUserByIdPayload.interface';

export function userAuth(
  user: findUserByIdPayload,
  update: boolean,
  access: string,
  refresh: string,
) {
  return {
    user: user,
    update: update,
    tokens: {
      access: access,
      refresh: refresh,
    },
  };
}
