export function lastSeenMsgDateFormatting(date: Date | undefined) {
  if (date) {
    const dateNow = new Date();

    if (date.toLocaleDateString() === dateNow.toLocaleDateString()) {
      return `today at ${date.toLocaleTimeString().slice(0, -3)}`;
    }

    return `${date.toLocaleDateString()} at ${date
      .toLocaleTimeString()
      .slice(0, -3)}`;
  }

  return "";
}
