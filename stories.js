const storiesData = {
    kongjwi: {
        title: "콩쥐팥쥐 🫘",
        content: `
            <p>옛날 옛적에 마음씨 착한 콩쥐가 살았어요.</p>
            <p>하지만 새엄마와 팥쥐는 콩쥐를 미워해서 매일 힘든 일만 시켰답니다.</p>
            <p>어느 날, 새엄마는 콩쥐에게 밑 빠진 독에 물을 채우라고 했어요.</p>
            <p>콩쥐가 엉엉 울고 있을 때, 커다란 두꺼비 한 마리가 나타나 독의 구멍을 막아주었어요! 🐸</p>
            <p>그리고 검은 소가 나타나 밭도 갈아주고, 직녀들이 내려와 베도 짜주었죠.</p>
            <p>덕분에 콩쥐는 원님을 만나 행복하게 살았답니다. 🎉</p>
        `
    },
    heungbu: {
        title: "흥부와 놀부 🐦",
        content: `
            <p>옛날 옛적에 욕심쟁이 형 놀부와 착한 동생 흥부가 살았어요.</p>
            <p>흥부는 가난했지만 제비의 부러진 다리를 정성껏 고쳐주었답니다. 🩹</p>
            <p>다음 해 봄, 제비는 흥부에게 박씨 하나를 물어다 주었어요.</p>
            <p>박씨를 심었더니 커다란 박이 열렸고, 박을 탔더니 그 안에서 금은보화가 쏟아져 나왔어요! 💰</p>
            <p>소문을 들은 놀부는 일부러 제비 다리를 부러뜨리고 고쳐주었지만, 놀부의 박에서는 무서운 도깨비들이 나와 놀부를 혼내주었답니다. 👹</p>
            <p>놀부는 자신의 잘못을 뉘우치고 흥부와 사이좋게 살았어요. 🤝</p>
        `
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const storyCards = document.querySelectorAll('.story-card');
    const storyMenu = document.querySelector('.story-menu');
    const storyContentContainer = document.getElementById('story-content-container');
    const storyReader = document.getElementById('story-reader');
    const backBtn = document.getElementById('back-to-story-menu');

    storyCards.forEach(card => {
        card.addEventListener('click', () => {
            const storyId = card.getAttribute('data-story');
            const story = storiesData[storyId];
            
            if (story) {
                storyReader.innerHTML = \`
                    <h3>\${story.title}</h3>
                    <div class="story-text">\${story.content}</div>
                \`;
                
                storyMenu.classList.add('hidden');
                storyContentContainer.classList.remove('hidden');
            }
        });
    });

    backBtn.addEventListener('click', () => {
        storyContentContainer.classList.add('hidden');
        storyMenu.classList.remove('hidden');
    });
});
