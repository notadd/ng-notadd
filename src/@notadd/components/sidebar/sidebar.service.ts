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

    register(key, sidebar): void {
        if (this.registry[key]) {
            console.error(`The sidebar with the key '${key}' already exists. Either unregister it first or use a unique key.`);

            return;
        }

        this.registry[key] = sidebar;
    }

    unregister(key): void {
        if (!this.registry[key]) {
            console.warn(`The sidebar with the key '${key}' doesn't exist in the registry.`);
        }

        delete this.registry[key];
    }

    getSidebar(key): NotaddSidebarComponent {
        if (!this.registry[key]) {
            console.warn(`The sidebar with the key '${key}' doesn't exist in the registry.`);

            return;
        }

        return this.registry[key];
    }
}
