/**
 * IUIView 接口，UI生命周期
 */
export interface IUIView {
    OnInit(): void;      // 初始化
    OnShow(): void;      // 显示
    OnHide(): void;      // 隐藏
    OnClose(): void;     // 销毁
}

import { _decorator, Component, Button, Slider, EditBox, Toggle, Node } from 'cc';
import { UIBaseComponent } from './UIBaseComponent';
const { ccclass } = _decorator;

@ccclass('UIBaseView')
export class UIBaseView extends Component implements IUIView {
    // UI组件引用
    protected _uiComponent: UIBaseComponent | null = null;
    // UI状态
    protected _isInitialized: boolean = false;
    protected _isVisible: boolean = false;

    public get UIComponent() { return this._uiComponent; }

    // 生命周期方法
    public OnInit(): void {
        if (this._isInitialized) return;
        // 获取UI组件
        this._uiComponent = this.getComponent(UIBaseComponent);
        if (!this._uiComponent) {
            console.error(`UIBaseComponent not found on ${this.node.name}`);
            return;
        }
        this._uiComponent.Init && this._uiComponent.Init(this);
        this._isInitialized = true;
    }

    public OnShow(): void {
        if (!this._isInitialized) {
            this.OnInit();
        }
        this._isVisible = true;
        this.node.active = true;
    }

    public OnHide(): void {
        this._isVisible = false;
        this.node.active = false;
    }

    public OnClose(): void {
        // 可扩展：销毁逻辑
        this.node.destroy();
    }

    // 事件回调（可被子类重写）
    public OnButtonClicked(button: Button) {}
    public OnSliderValueChanged(slider: Slider, value: number) {}
    public OnInputFieldValueChanged(editBox: EditBox, value: string) {}
    public OnToggleValueChanged(toggle: Toggle, value: boolean) {}
} 