import bcryptjs from 'bcryptjs';

const encryption = async (password) => {
  const saltRounds = 10;

  const hash = await bcryptjs.hash(password, saltRounds);
  //console.log(hash);
  return hash;
}

const comparePass = async (password, hash) => {
  try {
    const isMatch = await bcryptjs.compare(password, hash);
    return isMatch;
  } catch (e) {
    return false;
  }
}

export default { encryption, comparePass };