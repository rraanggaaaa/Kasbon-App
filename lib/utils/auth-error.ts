export function translateAuthError(message: string) {
  if (message.includes("Invalid login credentials")) {
    return;

    ("Email atau password salah");
  }

  if (message.includes("User already registered")) {
    return;

    ("Email sudah terdaftar");
  }

  return message;
}
