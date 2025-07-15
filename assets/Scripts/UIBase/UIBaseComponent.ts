/**
 * UIBaseComponent
 * 适配自Unity的UI基类，支持组件收集、事件自动绑定、异步加载、批量管理等
 * 使用方式与Unity类似，适配Cocos Creator 3.x
 */
import { _decorator, Component, Node } from 'cc';
import { UIBaseView } from './UIBaseView';
const { ccclass } = _decorator;

@ccclass('UIBaseComponent')
export class UIBaseComponent extends Component {
    protected _uiBaseView: UIBaseView | null = null;

    /** 初始化，传入UIBaseView */
    public Init(uiBaseView: UIBaseView) {
        this._uiBaseView = uiBaseView;
        // 可扩展：组件收集、事件注册等
    }
} 