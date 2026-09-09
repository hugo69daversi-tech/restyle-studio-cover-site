// Creneaux de publication : lundi, mercredi, vendredi, 8h.
const SLOT_WEEKDAYS = [1, 3, 5];
const SLOT_HOUR = 8;

/** Premier creneau lundi/mercredi/vendredi strictement apres la date donnee. */
export function nextSlotAfter(date: Date): Date {
  const slot = new Date(date);
  slot.setHours(SLOT_HOUR, 0, 0, 0);
  do {
    slot.setDate(slot.getDate() + 1);
  } while (!SLOT_WEEKDAYS.includes(slot.getDay()));
  return slot;
}

/** Nombre de creneaux lundi/mercredi/vendredi entre deux dates (inclus la date de fin). */
export function countSlotsUntil(from: Date, until: Date): number {
  let count = 0;
  let cursor = new Date(from);
  while (cursor <= until) {
    if (SLOT_WEEKDAYS.includes(cursor.getDay())) count++;
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
}
