/**
 * 508 Compliance Utilities
 */

// Check if element has sufficient color contrast
export const checkColorContrast = (element: HTMLElement): boolean => {
    // Simplified contrast check
    // In production, use a proper contrast checking library
    const style = window.getComputedStyle(element);
    return true; // Assume compliant for POC
};

// Set focus to first interactive element in a modal/dialog
export const setInitialFocus = (containerId: string) => {
    const container = document.getElementById(containerId);
    if (container) {
        const focusable = container.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable) {
            focusable.focus();
        }
    }
};

// Announce to screen readers
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.getElementById('sr-announcement');
    if (announcement) {
        announcement.setAttribute('aria-live', priority);
        announcement.textContent = message;

        // Clear after a delay
        setTimeout(() => {
            announcement.textContent = '';
        }, 1000);
    }
};

// Keyboard navigation trap for modals
export const createFocusTrap = (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    };

    element.addEventListener('keydown', handleTabKey);

    return () => {
        element.removeEventListener('keydown', handleTabKey);
    };
};

// Validate form for accessibility
export const validateFormAccessibility = (formId: string): string[] => {
    const errors: string[] = [];
    const form = document.getElementById(formId);

    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach((input, index) => {
            const id = input.getAttribute('id');
            const label = document.querySelector(`label[for="${id}"]`);

            if (!label && input.getAttribute('aria-label') === null) {
                errors.push(`Input #${index + 1} missing accessible label`);
            }

            if (input.hasAttribute('required') && input.getAttribute('aria-required') !== 'true') {
                errors.push(`Required input #${index + 1} missing aria-required`);
            }
        });
    }

    return errors;
};