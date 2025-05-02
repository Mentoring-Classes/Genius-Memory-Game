import gsap from "gsap"

/* export const triggerAnimation = () => {
    gsap.fromTo(".HomeLink", {
        opacity: 0.4,
       
        x: 100,
        scale: 0.5,
    },
        {
            opacity: 1,
            x:0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
        }
    )
} */
export const triggerAnimationRed = () => {
    gsap.fromTo(".imageRed", {
        opacity: 0,
        y: -100,
        
        height: 0,
    },
    {
        opacity: 1,
        y:0,
        
        duration: 0.5,
        height: 150,
        ease:"circ.inOut",
        }
    )
}

export const triggerAnimationGreen = () => {
    gsap.fromTo(".imageGreen", {
        opacity: 0,
        y: 100,
        
        height: 0,
    },
    {
        opacity: 1,
        y:0,
        delay: 0.2,
        duration: 0.5,
        height: 150,
        ease:"circ.inOut",
        }
    )
}

export const triggerAnimationYellowAndBlue = () => {
    gsap.fromTo(".imageBlue, .imageYellow", {
        opacity: 0,
        x: 200,
        width: 0,
    },
    {
        opacity: 1,
        x:0,
        delay: 0.4,
        duration: 0.5,
        stagger:0.1,
        width: 300,
        ease:"circ.inOut",
        }
    )
}