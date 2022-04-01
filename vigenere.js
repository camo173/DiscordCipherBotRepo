async function convertToVigenere(key, input) {
    if(key === null){ // check if the user gave a key
      return "Missing key";
    }
    key = key.toUpperCase();
    let encrypted = "";
    let keyArray = [];
    let keyArrayPointer = 0; // points to the current key character value
  
    for (let i = 0; i < key.length; i++) { // create an array out of key
      if (key.charCodeAt(i) >= 65 && key.charCodeAt(i) <= 90) {
        keyArray[i] = key.charCodeAt(i)-65;
      }
      console.log(keyArray[i]);
    }
    
    console.log("finished converting key");
    
    for (let i = 0; i < input.length; i++) {
      
      let tempNumber = input.charCodeAt(i);
      
      if ((tempNumber >= 65 &&  tempNumber <= 90)) { // entered character is a letter
        tempNumber += keyArray[keyArrayPointer];
        
        if (tempNumber > 90) {
          tempNumber -= 26;
        }
        encrypted += String.fromCharCode(tempNumber);
        console.log('Adding:', String.fromCharCode(tempNumber));
        console.log(encrypted);
  
        if (keyArrayPointer+1 <= keyArray.length-1) {
          keyArrayPointer++;
        }
        else {
          keyArrayPointer = 0;
        }
      }
        else if ((tempNumber >= 97 && tempNumber <= 122)) {
          tempNumber += keyArray[keyArrayPointer];
        
          if (tempNumber > 122) {
            tempNumber -= 26;
          }
          encrypted += String.fromCharCode(tempNumber);
          console.log('Adding:', String.fromCharCode(tempNumber));
          console.log(encrypted);
    
          if (keyArrayPointer+1 <= keyArray.length-1) {
            keyArrayPointer++;
          }
          else {
            keyArrayPointer = 0;
          }
        }
      else { // entered character is not a letter
        encrypted += String.fromCharCode(tempNumber);
        console.log('Adding:', String.fromCharCode(tempNumber));
      }
    }
    return encrypted;
  }
  
  async function convertFromVigenere(key, input) {
      if(key === null){ // check if the user gave a key
      return "Missing key";
    }
  
    key = key.toUpperCase();
    let decrypted = "";
    let keyArray = [];
    let keyArrayPointer = 0; // points to the current key character value
  
    for (let i = 0; i < key.length; i++) { // create an array out of key
      if (key.charCodeAt(i) >= 65 && key.charCodeAt(i) <= 90) {
        keyArray[i] = key.charCodeAt(i)-65;
      }
      console.log(keyArray[i]);
    }
    
    console.log("finished converting key");
  
    for (let i = 0; i < input.length; i++) {
      
      let tempNumber = input.charCodeAt(i);
      
      if ((tempNumber >= 65 &&  tempNumber <= 90)) { // entered character is a letter
        tempNumber -= keyArray[keyArrayPointer];
        console.log("Temp number is: "+ tempNumber + "\n");
        
        if (tempNumber < 65) {
          tempNumber += 26;
        }
        decrypted += String.fromCharCode(tempNumber);
        console.log('Adding:', String.fromCharCode(tempNumber));
        console.log(decrypted);
  
        if (keyArrayPointer+1 <= keyArray.length-1) {
          keyArrayPointer++;
        }
        else {
          keyArrayPointer = 0;
        }
      }
        else if ((tempNumber >= 97 && tempNumber <= 122)) {
          tempNumber -= keyArray[keyArrayPointer];
          console.log("Temp number is: "+ tempNumber + "\n");
        
          if (tempNumber < 97) {
            tempNumber += 26;
          }
          decrypted += String.fromCharCode(tempNumber);
          console.log(decrypted);
    
          if (keyArrayPointer+1 <= keyArray.length-1) {
            keyArrayPointer++;
          }
          else {
            keyArrayPointer = 0;
          }
        }
      else { // entered character is not a letter
        decrypted += String.fromCharCode(tempNumber);
      }
    }
    return decrypted;
  }
  
  module.exports.convertToVigenere = convertToVigenere
  module.exports.convertFromVigenere = convertFromVigenere