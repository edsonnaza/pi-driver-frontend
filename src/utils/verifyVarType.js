function verificarTipo(variable) {
    if (typeof variable === "number") {
      return "Number";
    } else if (typeof variable === "string") {
      if (!isNaN(variable)) {
        return "AlphaNumber)";
      } else {
        return "StringChain";
      }
    } else {
      return "Datatype is not valid!";
    }
  }
  
   