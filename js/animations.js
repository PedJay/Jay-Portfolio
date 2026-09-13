/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

/*
    Uses the browser's native IntersectionObserver
    instead of an external animation dependency.
*/

const animatedElements = document.querySelectorAll(
    ".section-label, .section-title, .about-text, " +
    ".skill-card, .project-card, .timeline-item, " +
    ".certificate-card, .contact-card"
);

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* Add a hidden/reveal class only when animations are allowed. */
if (!prefersReducedMotion) {

    animatedElements.forEach((element) => {

        element.classList.add("reveal-on-scroll");

    });


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observerInstance.unobserve(
                            entry.target
                        );
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    animatedElements.forEach((element) => {

        observer.observe(element);

    });


    /* Stagger cards for a more polished reveal. */
    document
        .querySelectorAll(
            ".skills-grid, .projects-grid, " +
            ".certifications-grid, .contact-grid"
        )
        .forEach((grid) => {

            [...grid.children]
                .forEach((child, index) => {

                    child.style.setProperty(
                        "--delay",
                        `${index * 80}ms`
                    );
                });
        });
}
