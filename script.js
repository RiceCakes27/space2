const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const numOfStars = 100;
function randNum(min, max) {
    return Math.random() * (max - min) + min;
}

function createStar(num) {
    // Store each star's properties in window
    window["star"+num] = {
        x: randNum(10, canvas.width - 10),
        y: randNum(10, canvas.height - 10),
        radius: randNum(2, 4),
        alpha: randNum(0.5, 1),
        dx: randNum(-1, 1),  // Movement speed in x direction
        dy: randNum(-1, 1)   // Movement speed in y direction
    };
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before redrawing

    for (let i = 0; i < numOfStars; i++) {
        let star = window["star"+i];
        if (!star) continue;

        ctx.save(); // Save current context state
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.globalAlpha = star.alpha;
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore(); // Restore original state
    }
}

function moveStars() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < numOfStars; i++) {
        let star = window["star"+i];
        if (!star) continue;

        // Calculate the direction vector from the star to the center
        let dx = centerX - star.x;
        let dy = centerY - star.y;

        // Normalize the direction vector (make it a unit vector)
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0) {
            dx /= distance;
            dy /= distance;
        }

        // Move the star along the direction vector
        star.x += dx * 2; // Adjust the speed by multiplying by a factor
        star.y += dy * 2;

        // If the star is close to the center, reset its position
        if (distance < 5) {
            star.x = randNum(10, canvas.width + 10);
            star.y = randNum(10, canvas.height + 10);
        }
    }

    drawStars(); // Redraw after moving
    //requestAnimationFrame(moveStars); // Keep moving
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create 10 stars
for (let i = 0; i < numOfStars; i++) {
    createStar(i);
}

drawStars(); // Initial drawing
//moveStars(); // Start animation loop

/*
canvas.addEventListener("scroll", (event) => {
    moveStars();
  });
*/

    canvas.addEventListener('scroll', (e) => {
        console.log('scrolling');
    });

    let MOUSE_OVER = false;
    canvas.addEventListener('wheel', (e) => {
        if (MOUSE_OVER) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
            return false;
        }
    });

    canvas.addEventListener('mouseenter', () => {
        MOUSE_OVER = true;
    });
    canvas.addEventListener('mouseleave', () => {
        MOUSE_OVER = false;
    });

    canvas.addEventListener('wheel', (e) => {
        let delta = e.wheelDelta;
        if (delta > 0) {
            
        } else {
            moveStars();
        }
    });
