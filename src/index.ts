import { Transposition } from "./transposition";

const args = process.argv.slice(2);


const t = new Transposition(args[0], args[1]);
t.prepareKey();
t.prepareMatrix();

console.log(`Encrypted: ${t.encrypt()}`);
console.log(`Decrypted: ${t.decrypt()}`);