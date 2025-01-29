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
    for (let i = 0; i < numOfStars; i++) {
        let star = window["star"+i];
        if (!star) continue;

        if (star.x > canvas.width/2 && star.y > canvas.height/2) {
            star.x -=2
            star.y -=2
        }
        if (star.x < canvas.width/2 && star.y < canvas.height/2) {
            star.x +=2
            star.y +=2
        }
        if (star.x < canvas.width/2 && star.y > canvas.height/2) {
            star.x +=2
            star.y -=2
        }
        if (star.x > canvas.width/2 && star.y < canvas.height/2) {
            star.x -=2
            star.y +=2
        }
        var diff = Math.abs(canvas.width/2 - star.x);
        var diff2 = Math.abs(canvas.height/2 - star.y)
        if( diff < 10 && diff2 < 10) {
            star.x = randNum(10, canvas.width - 10);
            star.y = randNum(10, canvas.height - 10);
        }
        /*
        if (star.x == canvas.width/2 || star.y == canvas.height/2) {
            star.x = randNum(10, canvas.width - 10);
            star.y = randNum(10, canvas.height - 10);
        }
        */
        // Update position
        //star.x += star.dx;
        //star.y += star.dy;

        // Bounce off edges
        //if (star.x <= 10 || star.x >= canvas.width - 10) star.dx *= -1;
        //if (star.y <= 10 || star.y >= canvas.height - 10) star.dy *= -1;
    }

    drawStars(); // Redraw after moving
    requestAnimationFrame(moveStars); // Keep moving
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create 10 stars
for (let i = 0; i < numOfStars; i++) {
    createStar(i);
}

drawStars(); // Initial drawing
moveStars(); // Start animation loop
