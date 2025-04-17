import { Application } from "@hotwired/stimulus";
import HeroEffectsController from "../../src/controllers/hero_effects_controller";

// Mock IntersectionObserver
let mockIntersectionObserverCallback: IntersectionObserverCallback | null = null;
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];

    constructor(callback: IntersectionObserverCallback) {
        mockIntersectionObserverCallback = callback;
    }

    observe = mockObserve;
    unobserve = mockUnobserve;
    disconnect = mockDisconnect;
    takeRecords = vi.fn();
}

// Helper to simulate intersection changes
const simulateIntersection = (isIntersecting: boolean, targetElement: Element) => {
    if (mockIntersectionObserverCallback) {
        const entry: Partial<IntersectionObserverEntry> = {
            isIntersecting: isIntersecting,
            target: targetElement,
        };
        // Simulate the observer calling the callback
        mockIntersectionObserverCallback([entry as IntersectionObserverEntry], new MockIntersectionObserver(() => {}));
    }
};

// Helper to set up the DOM and start Stimulus
const setupDOM = async (
    initialClass = "",
    initialVisibility = false,
): Promise<{ application: Application; element: HTMLElement }> => {
    document.body.innerHTML = `
        <div data-controller="hero-effects" class="${initialClass}" id="hero">
            Hero Content
        </div>
    `;

    const element = document.getElementById("hero") as HTMLElement;

    // Mock getBoundingClientRect is no longer strictly needed after controller refactor,
    // but keep it for now in case it's used by other parts of the test setup indirectly.
    vi.spyOn(element, "getBoundingClientRect").mockReturnValue({
        top: initialVisibility ? 100 : window.innerHeight + 50, // Visible if top < window.innerHeight
        bottom: initialVisibility ? 200 : window.innerHeight + 150,
        left: 0,
        right: 100,
        width: 100,
        height: 100,
        x: 0,
        y: initialVisibility ? 100 : window.innerHeight + 50,
        toJSON: () => ({}),
    });

    const application = Application.start();
    application.register("hero-effects", HeroEffectsController);

    // Wait for Stimulus connection using a microtask
    await new Promise((resolve) => setTimeout(resolve, 0));

    return { application, element };
};

describe("HeroEffectsController", () => {
    let application: Application;
    let element: HTMLElement;

    beforeAll(() => {
        // Replace the native IntersectionObserver with our mock
        Object.defineProperty(window, "IntersectionObserver", {
            writable: true,
            configurable: true,
            value: MockIntersectionObserver,
        });
        // Mock window.innerHeight
        Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 800 });
    });

    beforeEach(() => {
        mockIntersectionObserverCallback = null;
        mockObserve.mockClear();
        mockUnobserve.mockClear();
        mockDisconnect.mockClear();
        vi.clearAllMocks();
    });

    afterEach(async () => {
        // Remove timer related calls
        application?.stop();
        document.body.innerHTML = ""; // Clean up DOM
    });

    // Note: Tests no longer need to fast-forward time

    it("should not add active class immediately if observer doesn't fire instantly", async () => {
        // Simulate a scenario where the observer doesn't fire immediately upon observe()
        // (This depends on the test runner's event loop behavior, but we ensure
        // the observer mock is called before checking the class)
        ({ application, element } = await setupDOM("", false)); // Start not visible

        // Directly after setup, the observer has been called, but the callback hasn't run yet
        expect(mockObserve).toHaveBeenCalledWith(element);
        expect(element.classList.contains(HeroEffectsController.activeClass)).toBe(false);
    });

    it("should observe element and wait for intersection", async () => {
        ({ application, element } = await setupDOM("", false)); // Start not visible
        expect(mockObserve).toHaveBeenCalledWith(element);
        expect(element.classList.contains(HeroEffectsController.activeClass)).toBe(false);
        expect(mockUnobserve).not.toHaveBeenCalled();
    });

    it("should add active class when element becomes intersecting", async () => {
        ({ application, element } = await setupDOM("", false));

        expect(mockObserve).toHaveBeenCalledWith(element);
        expect(element.classList.contains(HeroEffectsController.activeClass)).toBe(false);

        // Simulate the element intersecting
        simulateIntersection(true, element);

        // Check result after intersection simulation
        expect(element.classList.contains(HeroEffectsController.activeClass)).toBe(true);
        expect(mockUnobserve).toHaveBeenCalledWith(element); // Should unobserve after activating
    });

    it("should not add active class if element intersects but is already active", async () => {
        ({ application, element } = await setupDOM("", false));
        expect(mockObserve).toHaveBeenCalledWith(element);

        // Manually add class before simulating intersection
        element.classList.add(HeroEffectsController.activeClass);
        const classListSpy = vi.spyOn(element.classList, "add");

        simulateIntersection(true, element);

        expect(classListSpy).not.toHaveBeenCalled(); // .add should not be called again
        expect(mockUnobserve).toHaveBeenCalledWith(element); // Still should unobserve
        classListSpy.mockRestore();
    });

    it("should do nothing if element already has active class on connect", async () => {
        ({ application, element } = await setupDOM(HeroEffectsController.activeClass, false));

        // Observer should not be created or used because of the early return in connect()
        expect(mockObserve).not.toHaveBeenCalled();
        expect(mockUnobserve).not.toHaveBeenCalled();
        expect(mockIntersectionObserverCallback).toBeNull();
        // Class should remain
        expect(element.classList.contains(HeroEffectsController.activeClass)).toBe(true);
    });

    it("should clean up observer on disconnect", async () => {
        ({ application, element } = await setupDOM("", false));
        expect(mockObserve).toHaveBeenCalledWith(element); // Observer started

        // Disconnect the controller
        application.controllers[0].disconnect();

        // Check that cleanup methods were called
        expect(mockUnobserve).toHaveBeenCalledWith(element);
        expect(mockDisconnect).toHaveBeenCalled();
    });

    // Remove tests specifically testing the old setTimeout logic
});
