// L&M's Playhall - Game Launcher
// Version: 1.0.0

// Game catalog
const games = [
    {
        id: 'abc-learning',
        name: 'ABC Learning',
        description: 'Learn the alphabet by catching falling letters! Practice letter recognition and hand-eye coordination.',
        category: 'learning',
        icon: '🔤',
        path: 'games/abc-learning/index.html',
        status: 'live', // 'live' or 'coming-soon'
    },
    // Future games will be added here
    // Example:
    // {
    //     id: 'number-catch',
    //     name: 'Number Catch',
    //     description: 'Catch falling numbers and learn to count from 1 to 10!',
    //     category: 'learning',
    //     icon: '🔢',
    //     path: 'games/number-catch/index.html',
    //     status: 'coming-soon',
    // },
];

// State
let currentCategory = 'all';

// Initialize launcher
function init() {
    renderGames();
    setupFilters();
}

// Render games to the grid
function renderGames() {
    const grid = document.getElementById('games-grid');
    const emptyState = document.getElementById('empty-state');

    // Filter games by category
    const filteredGames = currentCategory === 'all'
        ? games
        : games.filter(game => game.category === currentCategory);

    // Clear grid
    grid.innerHTML = '';

    if (filteredGames.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    emptyState.style.display = 'none';

    // Render each game
    filteredGames.forEach(game => {
        const card = createGameCard(game);
        grid.appendChild(card);
    });
}

// Create a game card element
function createGameCard(game) {
    const card = document.createElement('a');
    card.className = 'game-card';

    if (game.status === 'coming-soon') {
        card.className += ' coming-soon';
        card.href = '#';
        card.onclick = (e) => {
            e.preventDefault();
            alert('This game is coming soon! Stay tuned.');
        };
    } else {
        card.href = game.path;
    }

    card.innerHTML = `
        <div class="game-icon">${game.icon}</div>
        <div class="game-title">${game.name}</div>
        <div class="game-description">${game.description}</div>
        <span class="game-category category-${game.category}">
            ${getCategoryLabel(game.category)}
        </span>
    `;

    return card;
}

// Get category display label
function getCategoryLabel(category) {
    const labels = {
        learning: '📚 Learning',
        focus: '🎯 Focus',
        relaxation: '🧘 Relaxation',
    };
    return labels[category] || category;
}

// Setup filter buttons
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update current category
            currentCategory = btn.dataset.category;

            // Re-render games
            renderGames();
        });
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', init);
