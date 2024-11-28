async function getRandomBookAndDisplay() {
try{
    const randomBookResponseData = await (await fetch("http://localhost:3003/randomBook")).json();
  
    

}
catch(e) {
    console.log("Could not retrieve random book.");
}

}