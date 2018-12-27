import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cascade-dropdownlist',
    templateUrl: './cascade-dropdownlist.component.html',
    styleUrls: ['./cascade-dropdownlist.component.scss']
})
export class CascadeDropdownlistComponent implements OnInit {

    options: Array<any> = [{
        value: 'guide',
        label: '指南',
        children: [{
            value: 'design-principles',
            label: '设计原则',
            children: [{
                value: 'consistent',
                label: '一致',
            }, {
                value: 'feedback',
                label: '反馈',
            }, {
                value: 'efficiency',
                label: '效率',
            }, {
                value: 'controllable',
                label: '可控',
            }],
        }],
    }, {
        value: 'component',
        label: '组件',
        children: [{
            value: 'layout',
            label: 'Layout 布局',
            children: []
        }, {
            value: 'color',
            label: 'Color 色彩',
        }, {
            value: 'typography',
            label: 'Typography 字体',
        }],
    }, {
        value: 'form',
        label: 'Form',
        children: [{
            value: 'radio',
            label: 'Radio 单选框',
        }, {
            value: 'checkbox',
            label: 'Checkbox 多选框',
        }, {
            value: 'input',
            label: 'Input 输入框',
        }, {
            value: 'input-number',
            label: 'InputNumber 计数器',
        }, {
            value: 'select',
            label: 'Select 选择器',
        }, {
            value: 'cascader',
            label: 'Cascader 级联选择器',
        }],
    }];

    constructor() { }

    ngOnInit() {
    }

    changeHandle(event: { path: Array<string>, value: string }): void {
        console.log(event);
    }

}
