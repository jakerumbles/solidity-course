const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

// Save private key to encrypted file. Now the key can only be used in deploy.js when someone knows the password
// This is a one time run per account
async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY_PASSWORD
  );
  console.log(encryptedJsonKey);
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
