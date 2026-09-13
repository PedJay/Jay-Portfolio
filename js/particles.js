/* =========================================
   PARTICLE BACKGROUND
========================================= */

/*
    Canvas is used instead of a heavy library.
    This keeps the portfolio fast and simple.
*/

const canvas =
    document.getElementById(
        "particle-canvas"
    );

const ctx =
    canvas?.getContext("2d");

if (canvas && ctx) {

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const particles = [];

    let width = 0;
    let height = 0;


    /* Resize the canvas to the browser window. */
    function resizeCanvas() {

        width =
            canvas.width =
            window.innerWidth;

        height =
            canvas.height =
            window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    /* Use fewer particles on small screens. */
    const particleCount =
        window.innerWidth < 700
            ? 30
            : 65;


    /* Create particles with random positions. */
    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push({

            x: Math.random() * width,

            y: Math.random() * height,

            size:
                Math.random() * 1.7 + .6,

            vx:
                (Math.random() - .5) * .35,

            vy:
                (Math.random() - .5) * .35,

            opacity:
                Math.random() * .35 + .12
        });
    }


    /* Draw the particles and connections. */
    function draw() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        particles.forEach((particle) => {

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(139,92,246,${particle.opacity})`;

            ctx.fill();


            if (!reducedMotion) {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;

            }


            /* Wrap around screen edges. */
            if (particle.x < 0)
                particle.x = width;

            if (particle.x > width)
                particle.x = 0;

            if (particle.y < 0)
                particle.y = height;

            if (particle.y > height)
                particle.y = 0;
        });


        /* Connect particles that are close together. */
        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const dx =
                    particles[i].x -
                    particles[j].x;

                const dy =
                    particles[i].y -
                    particles[j].y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                if (distance < 120) {

                    const opacity =
                        (1 - distance / 120)
                        * .11;

                    ctx.beginPath();

                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    );

                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    );

                    ctx.strokeStyle =
                        `rgba(139,92,246,${opacity})`;

                    ctx.lineWidth = 1;

                    ctx.stroke();
                }
            }
        }


        if (!reducedMotion) {

            requestAnimationFrame(draw);

        }
    }


    draw();
}
