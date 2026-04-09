import bcrypt from 'bcrypt';

// --- 1. TA FONCTION DE VALIDATION (Pour l'inscription) ---
export const validatePassword = (pwd: string, userAge: number): boolean => {
  if (!pwd || pwd.length < 8 || pwd.length > 20) return false;

  const hasUpperCase = /[A-Z]/.test(pwd);
  const hasLowerCase = /[a-z]/.test(pwd);
  const hasNumbers = /[0-9]/.test(pwd);
  const hasSpecial = /[^A-Za-z0-9]/.test(pwd);

  if (userAge < 12) {
    return hasLowerCase;
  } else if (userAge >= 12 && userAge < 65) {
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecial;
  } else {
    return hasNumbers || hasUpperCase;
  }
};

// --- 2. FONCTION DE HACHAGE (Pour l'inscription, après validation) ---
export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

// --- 3. FONCTION DE COMPARAISON (Pour la connexion) ---
export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};