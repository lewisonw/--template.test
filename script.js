const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loading 
function loading(){

    loader.hidden = false;
    quoteContainer.hidden = true;

}

// hide loading 
function loadingComplete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new Quote 
function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

// Replace the author string with "unknown" if it's empty.
    if (!quote.author) {
        author.textContent = "Unknown"
    // otherwise set it to the below  
    }else{
        author.textContent = quote.author;
    }
//    check the lenght of the quote to determine styling 
    if (quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
}
        quoteText.textContent = quote.text;
        loadingComplete();
}

// get quotes from a quotes API
async function getQuotes() {
    loading();
   
    const apiUrl = 'https://type.fit/api/quotes';
    try {

        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote(); 
        
        
    } catch (error) {
        
    }
    
}

//  tweet a quote 
 function tweetQuote(){
     const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
     window.open(twitterUrl, '_blank');
 }

//  event listeners 
newQuoteButton.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load 
getQuotes();


