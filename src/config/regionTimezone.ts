export const regionToTimezone: Record<string, string> = {
  // North America
  "us-east-1": "America/New_York",
  "us-east-2": "America/New_York",
  "us-west-1": "America/Los_Angeles",
  "us-west-2": "America/Los_Angeles",
  "ca-central-1": "America/Toronto",

  // South America
  "sa-east-1": "America/Sao_Paulo",

  // Europe
  "eu-west-1": "Europe/Dublin",
  "eu-west-2": "Europe/London",
  "eu-west-3": "Europe/Paris",
  "eu-north-1": "Europe/Stockholm",
  "eu-central-1": "Europe/Berlin",
  "eu-south-1": "Europe/Rome",
  "eu-south-2": "Europe/Madrid",
  "eu-central-2": "Europe/Zurich",

  // Asia Pacific
  "ap-southeast-1": "Asia/Singapore",
  "ap-southeast-2": "Australia/Sydney",
  "ap-southeast-3": "Asia/Jakarta",
  "ap-southeast-4": "Australia/Melbourne",
  "ap-south-1": "Asia/Kolkata",
  "ap-south-2": "Asia/Colombo",
  "ap-northeast-1": "Asia/Tokyo", // Japan
  "ap-northeast-2": "Asia/Seoul", // Korea
  "ap-northeast-3": "Asia/Osaka", // Japan
  "ap-east-1": "Asia/Hong_Kong",

  // Middle East
  "me-south-1": "Asia/Dubai",
  "me-central-1": "Asia/Riyadh",

  // Africa
  "af-south-1": "Africa/Johannesburg",

  // China
  "cn-north-1": "Asia/Shanghai",
  "cn-northwest-1": "Asia/Shanghai",

  // Default fallback
  default: "UTC",
};
