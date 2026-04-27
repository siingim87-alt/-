document.addEventListener('DOMContentLoaded', () => {
    const gameCards = document.querySelectorAll('.game-card');
    const gameMenu = document.getElementById('game-menu');
    const gameContainer = document.getElementById('game-container');
    const gameArea = document.getElementById('game-area');
    const backBtn = document.getElementById('back-to-game-menu');

    let animationId; // To keep track of the game loop
    let currentGame = null;

    // --- GAME 1: 콩쥐의 밑 빠진 독 막기 ---
    function startKongjwiGame() {
        gameArea.innerHTML = \`
            <h3 class="game-instructions">물통의 물이 새고 있어요! 나타나는 두꺼비를 클릭해서 구멍을 막으세요!</h3>
            <div class="score-display">물 높이: <span id="water-level">50</span>%</div>
            <canvas id="gameCanvas" width="600" height="400"></canvas>
        \`;
        
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const waterLevelDisplay = document.getElementById('water-level');

        let waterLevel = 50;
        let isGameOver = false;
        let toads = [];
        let holePlugged = false;
        let plugTimer = 0;

        // Spawn toads periodically
        let toadInterval = setInterval(() => {
            if (!isGameOver && !holePlugged) {
                toads.push({
                    x: Math.random() * (canvas.width - 50),
                    y: Math.random() * (canvas.height - 150) + 50, // Avoid text area
                    size: 40,
                    active: true
                });
            }
        }, 1500);

        canvas.addEventListener('mousedown', (e) => {
            if (isGameOver) return;
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            for (let i = 0; i < toads.length; i++) {
                const t = toads[i];
                if (t.active && 
                    clickX >= t.x && clickX <= t.x + t.size &&
                    clickY >= t.y && clickY <= t.y + t.size) {
                    
                    // Clicked a toad!
                    t.active = false;
                    holePlugged = true;
                    plugTimer = 100; // Plugged for 100 frames
                    waterLevel += 20; // Refill water
                    if (waterLevel > 100) waterLevel = 100;
                    break; // Only click one at a time
                }
            }
        });

        function gameLoop() {
            if (isGameOver) return;

            // Update
            if (holePlugged) {
                plugTimer--;
                if (plugTimer <= 0) {
                    holePlugged = false; // Unplugged again!
                }
            } else {
                waterLevel -= 0.2; // Water leaks!
            }

            if (waterLevel <= 0) {
                waterLevel = 0;
                isGameOver = true;
            } else if (waterLevel >= 100) {
                waterLevel = 100;
                isGameOver = true;
            }

            waterLevelDisplay.textContent = Math.floor(waterLevel);

            // Draw
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Pot
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(canvas.width/2 - 100, canvas.height - 200, 200, 200);
            
            // Draw Hole
            if (!holePlugged) {
                ctx.fillStyle = '#000000';
                ctx.beginPath();
                ctx.arc(canvas.width/2, canvas.height - 30, 15, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw leaking water
                ctx.fillStyle = '#4169E1';
                ctx.fillRect(canvas.width/2 - 5, canvas.height - 30, 10, 30);
            } else {
                // Draw Toad plugging the hole
                ctx.fillStyle = '#228B22'; // Green toad
                ctx.fillRect(canvas.width/2 - 20, canvas.height - 45, 40, 30);
                ctx.fillStyle = 'white';
                ctx.fillText("🐸", canvas.width/2 - 10, canvas.height - 25);
            }

            // Draw Water inside pot
            ctx.fillStyle = '#4169E1';
            const waterHeight = (waterLevel / 100) * 190;
            ctx.fillRect(canvas.width/2 - 90, canvas.height - 10 - waterHeight, 180, waterHeight);

            // Draw Toads to click
            ctx.font = '30px Arial';
            for (let t of toads) {
                if (t.active) {
                    ctx.fillText("🐸", t.x, t.y + 30);
                }
            }

            // Game Over Text
            if (isGameOver) {
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.fillRect(0,0,canvas.width, canvas.height);
                ctx.fillStyle = 'white';
                ctx.font = '40px Jua';
                ctx.textAlign = 'center';
                if (waterLevel >= 100) {
                    ctx.fillText("성공! 독에 물을 다 채웠어요! 🎉", canvas.width/2, canvas.height/2);
                } else {
                    ctx.fillText("실패! 물이 다 새버렸어요. 😭", canvas.width/2, canvas.height/2);
                }
            } else {
                animationId = requestAnimationFrame(gameLoop);
            }
        }

        gameLoop();
        
        // Expose stop function
        window.stopGame = function() {
            isGameOver = true;
            clearInterval(toadInterval);
            cancelAnimationFrame(animationId);
        };
    }

    // --- GAME 2: 흥부의 박 터뜨리기 (간단한 버전) ---
    function startHeungbuGame() {
        gameArea.innerHTML = \`
            <h3 class="game-instructions">떨어지는 금은보화를 바구니로 받으세요! (마우스 이동)</h3>
            <div class="score-display">점수: <span id="score">0</span></div>
            <canvas id="gameCanvas" width="600" height="400"></canvas>
        \`;

        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const scoreDisplay = document.getElementById('score');

        let score = 0;
        let isGameOver = false;
        let basketX = canvas.width / 2;
        let items = [];
        let timer = 60 * 30; // 30 seconds game

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            basketX = e.clientX - rect.left;
        });

        function gameLoop() {
            if (isGameOver) return;

            // Update
            timer--;
            if (timer <= 0) {
                isGameOver = true;
            }

            // Spawn items
            if (Math.random() < 0.05) {
                items.push({
                    x: Math.random() * canvas.width,
                    y: 0,
                    speed: Math.random() * 2 + 2,
                    type: Math.random() < 0.2 ? 'bad' : 'good' // 20% chance of goblin/rock
                });
            }

            // Move items and check collision
            for (let i = items.length - 1; i >= 0; i--) {
                let item = items[i];
                item.y += item.speed;

                // Check collision with basket (width 80, height 40)
                if (item.y > canvas.height - 50 && item.y < canvas.height - 10 &&
                    item.x > basketX - 40 && item.x < basketX + 40) {
                    if (item.type === 'good') {
                        score += 10;
                    } else {
                        score -= 20; // bad item
                    }
                    items.splice(i, 1);
                    scoreDisplay.textContent = score;
                } else if (item.y > canvas.height) {
                    items.splice(i, 1); // Missed
                }
            }

            // Draw
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Basket
            ctx.fillStyle = '#D2691E'; // Chocolate color
            ctx.beginPath();
            ctx.arc(basketX, canvas.height - 30, 40, 0, Math.PI);
            ctx.fill();

            // Draw Items
            ctx.font = '30px Arial';
            for (let item of items) {
                if (item.type === 'good') {
                    ctx.fillText("💰", item.x - 15, item.y);
                } else {
                    ctx.fillText("👹", item.x - 15, item.y);
                }
            }

            // Time bar
            ctx.fillStyle = 'red';
            ctx.fillRect(0, 0, (timer / (60 * 30)) * canvas.width, 5);

            if (isGameOver) {
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.fillRect(0,0,canvas.width, canvas.height);
                ctx.fillStyle = 'white';
                ctx.font = '40px Jua';
                ctx.textAlign = 'center';
                ctx.fillText(\`게임 종료! 최종 점수: \${score}점\`, canvas.width/2, canvas.height/2);
            } else {
                animationId = requestAnimationFrame(gameLoop);
            }
        }

        gameLoop();

        window.stopGame = function() {
            isGameOver = true;
            cancelAnimationFrame(animationId);
        };
    }

    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.getAttribute('data-game');
            
            gameMenu.classList.add('hidden');
            gameContainer.classList.remove('hidden');

            // Stop any existing game
            if (window.stopGame) window.stopGame();

            if (gameId === 'kongjwi') {
                startKongjwiGame();
            } else if (gameId === 'heungbu') {
                startHeungbuGame();
            }
        });
    });

    backBtn.addEventListener('click', () => {
        if (window.stopGame) window.stopGame();
        gameContainer.classList.add('hidden');
        gameMenu.classList.remove('hidden');
    });
});
