document.addEventListener("DOMContentLoaded", () => {

// Array to store quotes
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "Your time is limited, so don't waste it living someone else's life.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
    { text: "Do what you can, with what you have, where you are.", category: "Motivation" }
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Display the quote in the HTML
    document.getElementById("quoteDisplay").innerHTML = `
        <p>"${randomQuote.text}"</p>
        <small>- ${randomQuote.category}</small>
    `;
}

// Function to create a form for adding new quotes
function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.innerHTML = `
        <h2>Add a New Quote</h2>
        <input type="text" id="quoteText" placeholder="Enter quote text" required />
        <input type="text" id="quoteCategory" placeholder="Enter category" required />
        <button id="addQuoteButton">Add Quote</button>
    `;
    document.body.appendChild(formContainer);

    // Add event listener to the button to add the quote
    document.getElementById('addQuoteButton').addEventListener('click', () => {
        const text = document.getElementById('quoteText').value.trim();
        const category = document.getElementById('quoteCategory').value.trim();

        if (text && category) {
            quotes.push({ text, category });
            alert("Quote added successfully!");
            document.getElementById('quoteText').value = "";
            document.getElementById('quoteCategory').value = "";
        } else {
            alert("Please fill in both fields.");
        }
    });
}

// Add event listener to button to show a new random quote
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Show a random quote when the page loads

    showRandomQuote();
    createAddQuoteForm();
});
