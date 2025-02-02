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
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]'); // Get saved quotes or default to empty array
    storedQuotes.forEach(quote => addQuote(quote, false)); // Load quotes without re-saving to Local Storage
}
function addQuote(quoteText = randomQuote.value.trim(), save = true) {
    if (quoteText === '') {
        alert('Please enter a quote');
        return;
    }

    let lastViewedIndex = parseInt(sessionStorage.getItem('lastQuoteIndex')) || 0;
    quoteDisplay.textContent = quotes[lastViewedIndex];

    function showNextQuote() {
        lastViewedIndex = (lastViewedIndex + 1) % quotes.length; // Cycle through quotes
        quoteDisplay.textContent = quotes[lastViewedIndex];

        // Store the last viewed quote index in sessionStorage
        sessionStorage.setItem('lastQuoteIndex', lastViewedIndex);
    }
    function exportQuotes() {
        // Convert quotes array to a JSON string
        const jsonString = JSON.stringify(quotes, null, 2);
    
        // Create a Blob with the JSON data
        const blob = new Blob([jsonString], { type: "application/json" });
    
        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);
    
        // Create a download link
        const a = document.createElement("a");
        a.href = url;
        a.download = "quotes.json"; // File name
    
        // Simulate a click to trigger the download
        document.body.appendChild(a);
        a.click();
    
        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Create the export button
    const exportButton = document.createElement("button");
    exportButton.textContent = "Export Quotes";
    exportButton.addEventListener("click", exportQuotes);
    
    // Append the button to the page
    document.body.appendChild(exportButton);

<input type="file" id="importFile" accept=".json" onchange="importFromJsonFile(event)" />

    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
          const importedQuotes = JSON.parse(event.target.result);
          quotes.push(...importedQuotes);
          saveQuotes();
          alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
      };


    showNextQuote();
// Add event listener to button to show a new random quote
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Show a random quote when the page loads

    showRandomQuote();
    createAddQuoteForm();
     // Load quotes when the page loads
     loadQuotes();

     // Add event listener to button
     addButton.addEventListener('click', () => addQuote());
     importFromJsonFile()
});
