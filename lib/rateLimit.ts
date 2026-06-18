type RateLimitEntry = {
  count: number;
  firstAttempt: number;
};

const attempts = new Map<
  string,
  RateLimitEntry
>();

export function checkRateLimit(
  ip: string
) {
  const now = Date.now();

  const windowMs = 60000;
  const maxAttempts = 100;

  const existing =
    attempts.get(ip);

  console.log("IP:", ip);
  console.log(
    "Existing:",
    existing
  );

  if (!existing) {
    attempts.set(ip, {
      count: 1,
      firstAttempt: now,
    });

    console.log(
      "Attempt 1 recorded"
    );

    return true;
  }

  if (
    now - existing.firstAttempt >
    windowMs
  ) {
    attempts.set(ip, {
      count: 1,
      firstAttempt: now,
    });

    console.log(
      "Window reset"
    );

    return true;
  }

  if (
    existing.count >= maxAttempts
  ) {
    console.log(
      "RATE LIMIT HIT"
    );

    return false;
  }

  existing.count++;

  attempts.set(ip, existing);

  console.log(
    "Count:",
    existing.count
  );

  return true;
}