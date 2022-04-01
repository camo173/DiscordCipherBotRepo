async function convertRot13(input) {
    var encrypted = "";
    for (let i = 0; i < input.length; i++) { 
      let tempNumber = input.charCodeAt(i) // int
      if (tempNumber >= 65 &&  tempNumber <= 90) { // entered character is an uppercase letter, encrypt it
        let encryptedNumber = tempNumber + 13;
        if (encryptedNumber > 90) {
          encryptedNumber -= 26;
        }
        
        encrypted += String.fromCharCode(encryptedNumber);
      }
      else if (tempNumber >= 97 && tempNumber <= 122) { // entered character is a lowercase letter, encrypt it
          let encryptedNumber = tempNumber + 13;
          if (encryptedNumber > 122) {
            encryptedNumber -= 26;
          }
          
           encrypted += String.fromCharCode(encryptedNumber);
        }
      else { // entered character is not a letter, leave it alone
        encrypted += String.fromCharCode(tempNumber);
      }
    }
    return encrypted;
  }
  
  module.exports.convertRot13 = convertRot13