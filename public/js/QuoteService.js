async function displayQuote() {
try{
    const jsonQuoteResponse = await (await fetch(`http://localhost:3003/quote`)).json();
    document.getElementById("quoteParagraph").innerHTML = `${jsonQuoteResponse.quote + " ~ " + jsonQuoteResponse.author}`;
}
catch(e) {
    console.log("Quote Service not active.");
}
}

