let translateButton = document.querySelector('#translateButton');
let languages = ['Sumero ', 'Akkadico', 'Sanskrito vedico', 'Greco miceneo '];
let selectContainer = document.querySelector('.select-container');

languages.forEach(lang => {
    let option = document.createElement('option');
    option.value = lang.toLowerCase();
    option.textContent = lang;
    selectContainer.appendChild(option);
});


translateButton.addEventListener('click', async () => {
    // stringa da tradurre
    let inputText = document.querySelector('#inputext');
    const text = inputText.value.trim();

    // lingua di destinazione
    const targetLang = document.querySelector('#targetLang').value;
    if (!text) return;

    // contenitore finestra chat
    const chatWindow = document.querySelector('#chatWindow');

    // messaggio utente
    const userMessage = document.createElement('div');
    userMessage.className = "flex justify-end";

    const userBubble = document.createElement('div');
    userBubble.className = "max-w-[70%] bg-blue-600 text-white text-sm px-4 py-2 rounded-xl rounded-br-none";
    userBubble.textContent = text;

    userMessage.appendChild(userBubble);
    chatWindow.appendChild(userMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // chiamata backend
    try {
        const response = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, targetLang })
        });

        const data = await response.json();

        // risposta AI
        const iaResponse = document.createElement('div');
        iaResponse.className = "flex justify-start";

        const aiBubble = document.createElement('div');
        aiBubble.className = "max-w-[70%] bg-gray-700 text-white text-sm px-4 py-2 rounded-xl rounded-bl-none";
        aiBubble.textContent = data.translateText;

        iaResponse.appendChild(aiBubble);
        chatWindow.appendChild(iaResponse);
        chatWindow.scrollTop = chatWindow.scrollHeight;


    } catch (error) {
        console.log('err:' + error);
    }

    // pulisci input
    inputText.value = "";
});
