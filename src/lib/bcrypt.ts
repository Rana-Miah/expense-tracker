import bcrypt from 'bcryptjs'
export const comparePw = async (password: string, hashedPw: string) => await bcrypt.compare(password, hashedPw)
export const encryptPw = async (password: string) => await bcrypt.hash(password, await bcrypt.genSalt(10))