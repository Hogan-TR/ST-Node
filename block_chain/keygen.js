const ecLib = require("elliptic").ec;
const ec = new ecLib("secp256k1"); // curve name
const sha256 = require("crypto-js/sha256");

// 生成密钥对
const key = ec.genKeyPair();
// 拿到公钥和私钥，hex string格式
console.log("private", key.getPrivate("hex"));
console.log("public", key.getPublic("hex"));
const doc = "JustaTest-20";
const hashedDoc = sha256(doc).toString();
// 签名
const hexSignature = key.sign(hashedDoc, "base64").toDER("hex");

console.log("hashed doc", hashedDoc);
console.log("signature", hexSignature);
// 收到签名的一方
const publicKey = ec.keyFromPublic(key.getPublic("hex"), "hex");
// 以公钥来验证文档和签名
console.log(publicKey.verify(hashedDoc, hexSignature));

// tamper 篡改
const tamperedDoc = "JustaTest-10";
const hashedTamperedDoc = sha256(tamperedDoc).toString();
console.log("tampered hashed doc", hashedTamperedDoc);
console.log(publicKey.verify(hashedTamperedDoc, hexSignature));
