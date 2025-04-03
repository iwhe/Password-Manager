import bcrypt from "bcryptjs";

const encrypt = async (id) => {
  const salt = await bcrypt.genSalt(10);
  const encryptData = await bcrypt.hash(id, salt);

  return encryptData;
};

export default encrypt;
