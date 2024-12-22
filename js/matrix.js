const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// Matrix characters (more varied)
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?~あいうえおかきくけこ';
const charArray = chars.split('');
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize drops
for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * -100); // Start above screen for staggered effect
}

// Red matrix colors with more variation
const colors = [
    '#ff0000', // bright red
    '#ee0000', // red hat red
    '#cc0000', // darker red
    '#990000', // deep red
    '#ff3333', // light red
    '#ff6666'  // pale red
];

function draw() {
    // Semi-transparent black background for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    ctx.font = fontSize + 'px monospace';

    // Draw characters
    for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Gradient effect for vertical streams
        const streamLength = 20;
        for (let j = 0; j < streamLength; j++) {
            const y = (drops[i] - j) * fontSize;
            if (y < canvas.height && y > 0) {
                // Fade out effect
                const alpha = (1 - j / streamLength);
                const color = colors[Math.floor(Math.random() * colors.length)];
                ctx.fillStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                
                // Draw the character
                ctx.fillText(char, i * fontSize, y);
            }
        }

        // Reset drop when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move drop
        drops[i]++;
    }

    // Add random glitch effect
    if (Math.random() > 0.99) {
        ctx.fillStyle = colors[0] + '44';
        ctx.fillRect(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 100 + 100,
            2
        );
    }
}

// Animate
setInterval(draw, 35);
