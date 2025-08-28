export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
export function formatDividerDate(dateString) {
  const messageDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Set times to 00:00:00 for accurate day comparison
  messageDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);

  // Check for 'Today'
  if (messageDate.getTime() === today.getTime()) {
    return "Today";
  }

  // Check for 'Yesterday'
  if (messageDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }

  // Check if within the last 7 days (including today and yesterday)
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  if (messageDate > oneWeekAgo) {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return dayNames[messageDate.getDay()];
  }

  // If more than 7 days have passed, show "X days ago"
  const diffTime = Math.abs(today - messageDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} days ago`;
}