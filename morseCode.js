async function convertToMorseCode(input) {
    var input = input.toUpperCase().trim();
    var encrypted = "";
    for (let i = 0; i < input.length; i++) {
      let num = input.charCodeAt(i); // int
      switch(num){
        case(65)://A
          encrypted += ".-";
          break;
        case(66)://B
          encrypted += "-...";
          break;
        case(67)://C
          encrypted += "-.-.";
          break;
        case(68)://D
          encrypted += "-..";
          break;
        case(69)://E
          encrypted += ".";
          break;
        case(70)://F
          encrypted += "..-.";
          break;
        case(71)://G
          encrypted += "--.";
          break;
        case(72)://H
          encrypted += "....";
          break;
        case(73)://I
          encrypted += "..";
          break;
        case(74)://J
          encrypted += ".---";
          break;
        case(75)://K
          encrypted += "-.-";
          break;
        case(76)://L
          encrypted += ".-..";
          break;
        case(77)://M
          encrypted += "--";
          break;
        case(78)://N
          encrypted += "-.";
          break;
        case(79)://O
          encrypted += "---";
          break;
        case(80)://P
          encrypted += ".--.";
          break;
        case(81)://Q
          encrypted += "--.-";
          break;
        case(82)://R
          encrypted += ".-.";
          break;
        case(83)://S
          encrypted += "...";
          break;
        case(84)://T
          encrypted += "-";
          break;
        case(85)://U
          encrypted += "..-";
          break;
        case(86)://V
          encrypted += "...-";
          break;
        case(87)://W
          encrypted += ".--";
          break;
        case(88)://X
          encrypted += "-..-";
          break;
        case(89)://Y
          encrypted += "-.--";
          break;
        case(90)://Z
          encrypted += "--..";
          break;
        case(32)://New Word (Space)
          encrypted += "/";
          break;
        case(46)://Period
          encrypted += ".-.-.-";
          break;
        case(44)://Comma
          encrypted += "--..--";
          break;
        case(63)://Question Mark
          encrypted += "..--..";
          break;
        case(33)://Exclaimation Mark
          encrypted += "-.-.--";
          break;
        case(47)://Forward Slash
          encrypted += "-..-.";
          break;
        case(64)://@
          encrypted += ".--.-.";
          break;
        case(48)://0
          encrypted += "-----";
          break;
        case(49)://1
          encrypted += ".----";
          break;
        case(50)://2
          encrypted += "..---";
          break;
        case(51)://3
          encrypted += "...--";
          break;
        case(52)://4
          encrypted += "....-";
          break;
        case(53)://5
          encrypted += ".....";
          break;
        case(54)://6
          encrypted += "-....";
          break;
        case(55)://7
          encrypted += "--...";
          break;
        case(56)://8
          encrypted += "---..";
          break;
        case(57)://9
          encrypted += "----.";
          break;
  
        default:
          encrypted += String.fromCharCode(num);
      }
      encrypted += " ";
    }
    return encrypted;
  }
  
  async function convertFromMorseCode(input) {
    const inputArray = input.trim().split(" ");
    let inputArrayLength = inputArray.length;
    var decrypted = "";
    
    for (let i = 0; i < inputArrayLength; i++) {
      let letter = inputArray[i];
      switch(letter){
        case(".-"):
          decrypted += "A";
          break;
        case("-..."):
          decrypted += "B";
          break;
        case("-.-."):
          decrypted += "C";
          break;
        case("-.."):
          decrypted += "D";
          break;
        case("."):
          decrypted += "E";
          break;
        case("..-."):
          decrypted += "F";
          break;
        case("--."):
          decrypted += "G";
          break;
        case("...."):
          decrypted += "H";
          break;
        case(".."):
          decrypted += "I";
          break;
        case(".---"):
          decrypted += "J";
          break;
        case("-.-"):
          decrypted += "K";
          break;
        case(".-.."):
          decrypted += "L";
          break;
        case("--"):
          decrypted += "M";
          break;
        case("-."):
          decrypted += "N";
          break;
        case("---"):
          decrypted += "O";
          break;
        case(".--."):
          decrypted += "P";
          break;
        case("--.-"):
          decrypted += "Q";
          break;
        case(".-."):
          decrypted += "R";
          break;
        case("..."):
          decrypted += "S";
          break;
        case("-"):
          decrypted += "T";
          break;
        case("..-"):
          decrypted += "U";
          break;
        case("...-"):
          decrypted += "V";
          break;
        case(".--"):
          decrypted += "W";
          break;
        case("-..-"):
          decrypted += "X";
          break;
        case("-.--"):
          decrypted += "Y";
          break;
        case("--.."):
          decrypted += "Z";
          break;
        case("/"):
          decrypted += " ";
          break;
        case(".-.-.-"):
          decrypted += ".";
          break;
        case("--..--"):
          decrypted += ",";
          break;
        case("..--.."):
          decrypted += '\?';
          break;
        case("-.-.--"):
          decrypted += "!";
          break;
        case("-..-."):
          decrypted += "/";
          break;
        case(".--.-."):
          decrypted += "@";
          break;
        case("-----"):
          decrypted += "0";
          break;
        case(".----"):
          decrypted += "1";
          break;
        case("..---"):
          decrypted += "2";
          break;
        case("...--"):
          decrypted += "3";
          break;
        case("....-"):
          decrypted += "4";
          break;
        case("....."):
          decrypted += "5";
          break;
        case("-...."):
          decrypted += "6";
          break;
        case("--..."):
          decrypted += "7";
          break;
        case("---.."):
          decrypted += "8";
          break;
        case("----."):
          decrypted += "9";
          break;
  
        default:
          decrypted += letter;
      }
    }
    return decrypted;
  }
  
  module.exports.convertToMorseCode = convertToMorseCode
  module.exports.convertFromMorseCode = convertFromMorseCode