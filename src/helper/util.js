import bcrypt from "bcryptjs";

const hashPassword = (password, strength = 5) => {
  try {
    const salt = bcrypt.genSaltSync(strength);
    console.log(password);
    const hashedPassword = bcrypt.hash(password, salt);
    // console.log(hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.log(" bcrypt: " + error.message);
  }
};

const verifyPassword = (password, userPass) => {
  const verify = bcrypt.compareSync(password, userPass); // string and hashPassword
  return verify;
};

const comparePassword = (password, uPass) => bcrypt.compare(password, uPass);

export { hashPassword, verifyPassword, comparePassword };
