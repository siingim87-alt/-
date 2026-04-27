document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn, .quick-btn');
    const views = document.querySelectorAll('.view');

    function switchView(targetId) {
        // Hide all views
        views.forEach(view => {
            view.classList.remove('active');
        });

        // Remove active class from nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show target view
        const targetView = document.getElementById(targetId);
        if (targetView) {
            targetView.classList.add('active');
        }

        // Add active class to corresponding nav button (if it exists)
        const targetNavBtn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
        if (targetNavBtn) {
            targetNavBtn.classList.add('active');
        }
        
        // If switching to stories or games, make sure menus are visible and content hidden
        if (targetId === 'story-view') {
            document.querySelector('.story-menu').classList.remove('hidden');
            document.getElementById('story-content-container').classList.add('hidden');
        }
        if (targetId === 'game-view') {
            document.getElementById('game-menu').classList.remove('hidden');
            document.getElementById('game-container').classList.add('hidden');
            // stop any running game
            if(window.stopGame) window.stopGame();
        }
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            switchView(targetId);
        });
    });
});
