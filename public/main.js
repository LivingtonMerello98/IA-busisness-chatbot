const sendButton = document.querySelector('#sendButton');
const inputText = document.querySelector('#inputext');
const chatWindow = document.querySelector('#chatWindow');

async function request() {
    const text = inputText.value.trim();
    if (!text) return;

    // Messaggio utente
    const userMessage = document.createElement('div');
    userMessage.className = "flex justify-end";

    const userBubble = document.createElement('div');
    userBubble.className = "max-w-[70%] bg-blue-600 text-white text-sm px-4 py-2 rounded-xl rounded-br-none";
    userBubble.textContent = text;

    userMessage.appendChild(userBubble);
    chatWindow.appendChild(userMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    inputText.value = '';

    try {
        const response = await fetch('/api/chatbot/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        const iaResponse = document.createElement('div');
        iaResponse.className = "flex justify-start";

        const aiBubble = document.createElement('div');
        aiBubble.className = "max-w-[70%] bg-gray-700 text-white text-sm px-4 py-2 rounded-xl rounded-bl-none";
        aiBubble.textContent = data.reply;

        iaResponse.appendChild(aiBubble);
        chatWindow.appendChild(iaResponse);
        chatWindow.scrollTop = chatWindow.scrollHeight;

    } catch (error) {
        console.log('error: ', error);
    }
}

sendButton.addEventListener("click", request);

inputText.addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        await request();
    }
});
