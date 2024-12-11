const api_url = "https://zenquotes.io/api/random";

async function getQuote(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}

getQuote(api_url);
