export default function(float){

  if(!float){
    return `R$ 0,00`
  }

  const string = float.toString();
  const parsedArray = string.split('.');

  if(string === parsedArray[0]){
    return `R$ ${string},00`
  }else{
    return `R$ ${parsedArray[0]},${parsedArray[1]}`
  }
}