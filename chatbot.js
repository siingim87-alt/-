document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');

    // Simple rule-based responses
    const botResponses = {
        '콩쥐': '콩쥐는 마음씨가 아주 착한 아이야. 팥쥐와 새엄마 때문에 힘들었지만 잘 이겨냈지!',
        '팥쥐': '팥쥐는 콩쥐를 괴롭히는 심술쟁이 동생이야. 나중에는 벌을 받게 된단다.',
        '두꺼비': '맞아! 밑 빠진 독에 물을 채울 때 커다란 두꺼비가 나타나서 구멍을 막아줬어. 🐸',
        '소': '검은 소가 나타나서 넓은 밭을 순식간에 다 갈아줬어! 🐮',
        '베': '하늘에서 직녀들이 내려와서 콩쥐 대신 예쁜 베를 짜줬단다.',
        '흥부': '흥부는 가난하지만 다친 제비를 치료해주는 따뜻한 마음을 가졌어. 🐦',
        '놀부': '놀부는 엄청난 욕심쟁이야. 일부러 제비 다리를 부러뜨렸다가 도깨비한테 혼났지! 👹',
        '제비': '흥부가 다리를 고쳐준 은혜 갚은 제비! 이듬해 봄에 박씨를 물어다 줬어.',
        '박': '흥부의 박에서는 금은보화가 쏟아졌고, 놀부의 박에서는 도깨비가 나왔어! 🎃',
        '금': '흥부는 박에서 나온 금은보화 덕분에 큰 부자가 되었단다. 💰',
        '안녕': '안녕! 나는 도서관 요정이야. 동화에 대해 무엇이든 물어봐!',
        '도깨비': '놀부의 박에서 나온 도깨비들이 욕심쟁이 놀부를 아주 혼쭐내줬어!'
    };

    function addMessage(message, isUser) {
        const msgDiv = document.createElement('div');
        msgDiv.className = \`message \${isUser ? 'user-message' : 'bot-message'}\`;
        msgDiv.textContent = message;
        chatMessages.appendChild(msgDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(input) {
        // Very basic keyword matching
        for (const keyword in botResponses) {
            if (input.includes(keyword)) {
                return botResponses[keyword];
            }
        }
        return "으음~ 그건 잘 모르겠어. 콩쥐팥쥐나 흥부놀부 이야기에 나오는 다른 친구들을 물어볼래?";
    }

    function handleSend() {
        const text = chatInput.value.trim();
        if (text === '') return;

        // Add user message
        addMessage(text, true);
        chatInput.value = '';

        // Simulate thinking time before bot responds
        setTimeout(() => {
            const response = getBotResponse(text);
            addMessage(response, false);
        }, 500); // 0.5s delay
    }

    chatSend.addEventListener('click', handleSend);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
});
