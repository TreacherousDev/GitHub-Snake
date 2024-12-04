// Initialize a 2D array with dimensions 52x7
const contributionArray = Array.from({ length: 7 }, () => Array(52).fill(null));

// Select all contribution tiles on the page
const contributionTiles = document.querySelectorAll('td.ContributionCalendar-day');

// Map each tile to its position in the array and set data-level to 0
contributionTiles.forEach(tile => {
  const dataIx = parseInt(tile.getAttribute('data-ix')) - 1; // Width (subtract 1 for zero indexing)
  const row = tile.closest('tr'); // Get the closest <tr> ancestor
  const height = Array.from(row.parentNode.children).indexOf(row); // Row index determines height
  contributionArray[height][dataIx] = tile; // Store the tile in the 2D array
  tile.setAttribute('data-level', '0'); // Set the initial data-level to 0
});

// Snake state
let snake = [
  { x: 2, y: 0 }, // Initial tail
  { x: 1, y: 0 },
  { x: 0, y: 0 }  // Initial head
];
let direction = 'right'; // Default direction
let food = null; // Current food position
let gameOver = false; // Game state
let canChangeDirection = true; // Flag to prevent multiple direction changes in one game loop

// Function to spawn food at a random position
const spawnFood = () => {
  let x, y;
  let attempts = 0;
  const maxAttempts = 1000; // Safety limit to avoid infinite loop
  do {
    x = Math.floor(Math.random() * 52); // Random width
    y = Math.floor(Math.random() * 7);  // Random height
    attempts++;
    if (attempts > maxAttempts) {
      console.error("Failed to spawn food after multiple attempts.");
      return; // Abort if we can't find an empty cell
    }
  } while (snake.some(segment => segment.x === x && segment.y === y)); // Avoid placing food on the snake

  food = { x, y };
  const foodTile = contributionArray[y][x];
  if (foodTile) {
    foodTile.setAttribute('data-level', '4'); // Mark the tile as food
  }
};

// Function to end the game and display a "Game Over" message
const endGame = () => {
  gameOver = true;

  // Clear the grid
  contributionTiles.forEach(tile => tile.setAttribute('data-level', '0'));

  // Draw "GAME OVER" on the grid
  const message = [
    "111  111  101  111  00111 101 111 110",
    "100  101  111  100  00101 101 100 101",
    "101  111  101  110  00101 101 110 111",
    "101  101  101  100  00101 101 100 101",
    "111  101  101  111  00111 010 111 101",
  ]; // Simple block-style "GAME OVER" pattern

  message.forEach((row, y) => {
    row.split('').forEach((char, x) => {
      if (char === '1') {
        const tile = contributionArray[y + 1]?.[x + 6]; // Offset to center the message
        if (tile) {
          tile.setAttribute('data-level', '3'); // Highlight the tile
        }
      }
    });
  });
};

// Function to move the snake
const moveSnake = () => {
  if (gameOver) return; // Stop movement if the game is over

  // Allow direction change for the next loop
  canChangeDirection = true;

  // Calculate new head position
  const head = snake[0];
  let newHead = { x: head.x, y: head.y };

  if (direction === 'up') newHead.y = Math.max(0, newHead.y - 1);
  if (direction === 'down') newHead.y = Math.min(6, newHead.y + 1);
  if (direction === 'left') newHead.x = Math.max(0, newHead.x - 1);
  if (direction === 'right') newHead.x = Math.min(51, newHead.x + 1);

  // Check for collision with the snake itself
  if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
    endGame();
    return;
  }

  // Check for collision with food
  if (food && newHead.x === food.x && newHead.y === food.y) {
    snake.unshift(newHead); // Grow the snake by adding the new head
    spawnFood(); // Spawn new food
  } else {
    // Move the snake by removing the tail and adding the new head
    const tail = snake.pop();
    const tailTile = contributionArray[tail.y][tail.x];
    if (tailTile) {
      tailTile.setAttribute('data-level', '0'); // Clear the tail tile
    }
    snake.unshift(newHead);
  }

  // Update the snake's tiles
  snake.forEach(segment => {
    const segmentTile = contributionArray[segment.y][segment.x];
    if (segmentTile) {
      segmentTile.setAttribute('data-level', '2'); // Mark as part of the snake
    }
  });
};

// Add an event listener for the keydown to update the direction
document.addEventListener('keydown', (event) => {
  if (!canChangeDirection) return; // Ignore input if a change has already occurred in this loop

  const key = event.key.toLowerCase();
  if (key === 't' && direction !== 'down') {
    direction = 'up';
    canChangeDirection = false;
  }
  if (key === 'g' && direction !== 'up') {
    direction = 'down';
    canChangeDirection = false;
  }
  if (key === 'f' && direction !== 'right') {
    direction = 'left';
    canChangeDirection = false;
  }
  if (key === 'h' && direction !== 'left') {
    direction = 'right';
    canChangeDirection = false;
  }
});

// Spawn the initial food and start the game loop
spawnFood();
setInterval(moveSnake, 200); // Move the snake every 200 milliseconds
