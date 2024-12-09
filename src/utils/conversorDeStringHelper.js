module.exports = (objetoParams) => {
  for (let propriedade in objetoParams){
    if (/Id|id|ID/.test(propriedade)){
      objetoParams[propriedade] = Number(objetoParams[propriedade]);
    }

    return objetoParams;
  }
};