import CryptoJS from 'crypto-js';

function Hash(password){
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hashedPassword;
}

async function Compare(password,hashedPass){
    const temp = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    if(temp===hashedPass){
        return true;
    }
    else{
        return false;
    }
}

export {Hash,Compare}