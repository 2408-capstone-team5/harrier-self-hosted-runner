const now = new Date();
const timestamp = now.getTime(); // Get milliseconds since epoch

// Convert timestamp to base36 (alphanumeric)
export const installationHash = timestamp.toString(36);
