import { Injectable } from '@angular/core';
import { NotaddSidebarComponent } from './sidebar.component';

@Injectable({
    providedIn: 'root'
})
export class NotaddSidebarService {
    private registry: { [propName: string]: NotaddSidebarComponent };

    constructor() {
        this.registry = {};
    }

    /**
     * Add the sidebar to the registry
     *
     * @param key
     * @param sidebar
     */
    register(key, sidebar): void {
        // Check if the key already being used
        if (this.registry[key]) {
            console.error(`The sidebar with the key '${key}' already exists. Either unregister it first or use a unique key.`);

            return;
        }

        // Add to the registry
        this.registry[key] = sidebar;
    }

    /**
     * Remove the sidebar from the registry
     *
     * @param key
     */
    unregister(key): void {
        // Check if the sidebar exists
        if (!this.registry[key]) {
            console.warn(`The sidebar with the key '${key}' doesn't exist in the registry.`);
        }

        // Unregister the sidebar
        delete this.registry[key];
    }

    /**
     * Return the sidebar with the given key
     *
     * @param key
     * @returns {NotaddSidebarComponent}
     */
    getSidebar(key): NotaddSidebarComponent {
        // Check if the sidebar exists
        if (!this.registry[key]) {
            console.warn(`The sidebar with the key '${key}' doesn't exist in the registry.`);

            return;
        }

        // Return the sidebar
        return this.registry[key];
    }
}
