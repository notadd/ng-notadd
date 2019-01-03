import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Node for to-do item
 */
export class TodoItemNode {
    children?: Array<TodoItemNode>;
    label: string;
    value: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
    label: string;
    value: string;
    level: number;
    expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
const treeData = [
    {
        label: '常规',
        value: 'general',
        children: [
            {
                label: '分析页',
                value: 'asis'
            },
            {
                label: '分析页2',
                value: 'as2is'
            }
        ]
    }
];

@Injectable({
    providedIn: 'root'
})
export class PermissionsChecklistDatabase {
    dataChange: BehaviorSubject<Array<TodoItemNode>>;

    get data(): Array<TodoItemNode> {
        return this.dataChange.value;
    }

    constructor() {
        this.dataChange = new BehaviorSubject<Array<TodoItemNode>>([]);
        this.initialize();
    }

    initialize() {
        // Notify the change.
        this.dataChange.next(treeData);
    }
}
