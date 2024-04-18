import type { ConnectedUserDTO } from '../dto/connectedUserDTO';

export function binaryUserSearch(
  array: Array<ConnectedUserDTO>,
  targetUserId: number,
): string | null {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid].user_id === targetUserId) return array[mid].socket_id;

    if (array[mid].user_id < targetUserId) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return null;
}
