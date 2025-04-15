import { Controller } from "@hotwired/stimulus";

export default class HeroEffectsController extends Controller {
    private observer: IntersectionObserver | null = null;
    private activateTimeout: number | null = null; // Store main delay timeout ID
    private initTimeout: number | null = null; // Store initial observation timeout ID

    static intersectionOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        // rootMargin: "-1px 0px 0px 0px" // Remove rootMargin
    };
    static activeClass = "effects-active";

    connect() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.activate(); // Observer callback handles subsequent activations
                } else {
                    this.deactivate();
                }
            });
        }, HeroEffectsController.intersectionOptions);

        const rect = this.element.getBoundingClientRect();
        const isVisibleInitially = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisibleInitially) {
            this.activate();
        }
        // Start observing AFTER the initial visibility check and potential timeout setup
        this.observer?.observe(this.element);
    }

    disconnect() {
        // Clear timeouts
        if (this.initTimeout) {
            window.clearTimeout(this.initTimeout);
            this.initTimeout = null;
        }
        if (this.activateTimeout) {
            window.clearTimeout(this.activateTimeout);
            this.activateTimeout = null;
        }
        // Stop observing
        if (this.observer) {
            this.observer.unobserve(this.element);
            this.observer.disconnect();
        }
        // Clean up class
        this.deactivate(); // Use deactivate to ensure class removal
    }

    activate() {
        // Clear potential pending activation timeout if observer activates first
        if (this.activateTimeout) {
            window.clearTimeout(this.activateTimeout);
            this.activateTimeout = null;
        }
        this.element.classList.add(HeroEffectsController.activeClass);
    }

    deactivate() {
        // Clear pending activation timeout if element scrolls out before delay finishes
        if (this.activateTimeout) {
            window.clearTimeout(this.activateTimeout);
            this.activateTimeout = null;
        }
        this.element.classList.remove(HeroEffectsController.activeClass);
    }
}
