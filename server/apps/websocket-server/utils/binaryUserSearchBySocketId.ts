import { ActiveUsersDTO } from '../dto/activeUsersDTO';

export function binaryUserSearchByUserId(
  array: Array<ActiveUsersDTO>,
  user_id: number,
): number | null {
  if (array.length === 0) return null;

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid].user_id === user_id) return mid;

    if (array[mid].user_id < user_id) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return null;
}
