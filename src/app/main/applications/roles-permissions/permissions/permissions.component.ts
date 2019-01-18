import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

import { Role } from '../role/role.interface';
import { AdvancedSettingsComponent } from './advanced-settings/advanced-settings.component';

import { TodoItemNode, TodoItemFlatNode, PermissionsChecklistDatabase } from './permissions.service';

export interface PermissionType {
    value: string;
    label: string;
    tabIndex: number;
}

@Component({
    selector: 'permissions',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

    permissionType: Array<PermissionType>;
    currentPermissionType: PermissionType;
    roles: Array<Role>;
    currentRole: string;
    featurePermissions: Array<any>;
    dataPermission: string;
    dataPermissions: Array<any>;

    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

    treeControl: FlatTreeControl<TodoItemFlatNode>;

    treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

    dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

    /** The selection for checklist */
    checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

    constructor(
        public dialog: MatDialog,
        private database: PermissionsChecklistDatabase
    ) {
        this.permissionType = [
            {
                value: 'page',
                label: '页面权限',
                tabIndex: 0
            },
            {
                value: 'data',
                label: '数据权限',
                tabIndex: 1,
            },
            {
                value: 'feature',
                label: '功能权限',
                tabIndex: 2
            }
        ];

        this.roles = [
            {
                id: 'admin',
                name: '管理员',
                status: true,
                description: '管理员角色的描述。'
            },
            {
                id: 'guest',
                name: 'Guest',
                status: true,
                description: 'Guest角色的描述。'
            }
        ];

        this.currentPermissionType = this.permissionType[0];

        this.currentRole = (this.roles[0] as Role).id;

        this.featurePermissions = [
            {
                page: '仪表盘',
                permissions: [
                    {
                        label: '查看',
                        value: true
                    },
                    {
                        label: '编辑',
                        value: true
                    },
                    {
                        label: '新增',
                        value: true
                    },
                    {
                        label: '删除',
                        value: false
                    }
                ],
                advancedData: [
                    {
                        type: 'baseInfo',
                        title: '基本信息',
                        fields: [
                            {
                                label: '类型',
                                value: 'hide'
                            },
                            {
                                label: '名称',
                                value: 'default'
                            },
                            {
                                label: '来源',
                                value: 'readonly'
                            }
                        ]
                    },
                    {
                        type: 'contact',
                        title: '联系方式',
                        fields: [
                            {
                                label: '手机号',
                                value: 'hide'
                            },
                            {
                                label: '微信号',
                                value: 'default'
                            }
                        ]
                    }
                ]
            },
            {
                page: '用户管理',
                permissions: [
                    {
                        label: '查看',
                        value: true
                    },
                    {
                        label: '编辑',
                        value: true
                    },
                    {
                        label: '新增',
                        value: true
                    },
                    {
                        label: '删除',
                        value: false
                    }
                ],
                advancedData: [
                    {
                        type: 'baseInfo',
                        title: '基本信息',
                        fields: [
                            {
                                label: '类型',
                                value: 'hide'
                            },
                            {
                                label: '名称',
                                value: 'default'
                            },
                            {
                                label: '来源',
                                value: 'readonly'
                            }
                        ]
                    },
                    {
                        type: 'contact',
                        title: '联系方式',
                        fields: [
                            {
                                label: '手机号',
                                value: 'hide'
                            },
                            {
                                label: '微信号',
                                value: 'default'
                            }
                        ]
                    }
                ]
            }
        ];

        this.dataPermission = 'self';

        this.dataPermissions = [
            {
                value: 'self',
                label: '本人的数据'
            },
            {
                value: 'self-group',
                label: '本用户组的数据'
            },
            {
                value: 'self-group-subordinate',
                label: '本用户组的数据'
            },
            {
                value: 'all',
                label: '全部数据'
            }
        ];

        this.treeFlattener = new MatTreeFlattener(
            this.transformer,
            this.getLevel,
            this.isExpandable,
            this.getChildren
        );
        this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        database.dataChange.subscribe(data => {
            this.dataSource.data = data;
        });
    }

    getLevel = (node: TodoItemFlatNode) => node.level;

    isExpandable = (node: TodoItemFlatNode) => node.expandable;

    getChildren = (node: TodoItemNode): Array<TodoItemNode> => node.children;

    hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

    ngOnInit() {
    }

    onPermissionTypeItemClick(item: PermissionType): void {
        this.currentPermissionType = item;
        console.log(this.currentPermissionType);
    }

    onRoleItemClick(roleId): void {
        this.currentRole = roleId;
    }

    onFeaturePermissionChange(item): void {
        item.permissions = item.permissions.slice();
    }

    onFeaturePermissionCheckAllChange(item): void {
        item.permissions = (item.permissions as Array<any>).map(permission => {
            return Object.assign({}, permission, {
                value: item.checkedAll
            });
        });
    }

    openDialog(item): void {
        const dialogRef = this.dialog.open(AdvancedSettingsComponent, {
            width: '500px',
            data: item
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: TodoItemNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.value === node.value
            ? existingNode
            : new TodoItemFlatNode();
        flatNode.label = node.label;
        flatNode.value = node.value;
        flatNode.level = level;
        flatNode.expandable = !!node.children;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    }

    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        return descAllSelected;
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: TodoItemFlatNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);

        // Force update for the parent
        descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        this.checkAllParentsSelection(node);
    }

    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
    }

    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node: TodoItemFlatNode): void {
        let parent: TodoItemFlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }

    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node: TodoItemFlatNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    }

    /* Get the parent node of a node */
    getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return void (0);
        }

        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return void (0);
    }
}
