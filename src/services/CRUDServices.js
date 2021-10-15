import bcrypt from 'bcrypt';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstname,
                lastName: data.lastname,
                email: data.email,
                gender: data.gender === '1' ? true : false,
                roleId: data.role,
                phoneNumber: data.phonenumber,
                password: hashPassword,
                address: data.address,
            });

            resolve('Success');
        } catch (e) {
            reject(e);
        }
    });
};

let hashUserPassword = async (pwd) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(pwd, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createNewUser,
    hashUserPassword,
    getAllUser,
};
