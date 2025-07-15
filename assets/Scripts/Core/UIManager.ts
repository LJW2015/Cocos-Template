/**
 * UI管理器
 * 负责管理所有UI界面的生命周期、分层、事件通知等
 * 使用方式：
 * 1. 初始化：UIManager.Init();
 * 2. 打开UI：UIManager.OpenUI(UIIds.MainMenu);
 * 3. 关闭UI：UIManager.CloseUI(UIIds.MainMenu);
 */
import { Node, director } from 'cc';
import { UIBaseComponent } from '../UIBase/UIBaseComponent';
import { UIBaseView } from '../UIBase/UIBaseView';
import { UIViewFactory } from '../UIBase/UIViewFactory';
import { EventManager } from './EventManager';
import { EventIds } from './Const';
import { UIIds } from './Const';
import { ResourceManager } from './ResourceManager';

export enum UILayer {
    Background,
    Main,
    Popup,
    Tips,
}

export class UIManager {
    private static _uiDict: Map<string, Node> = new Map();
    private static _layerDict: Map<UILayer, Node> = new Map();
    private static _uiRoot: Node | null = null;
    private static _isInitialized: boolean = false;

    /** 初始化UI管理器 */
    public static Init() {
        if (this._isInitialized) {
            console.warn('UIManager 已经初始化');
            return;
        }
        // 获取UI根节点（假设场景中有名为UICanvas的节点）
        this._uiRoot = director.getScene().getChildByName('UICanvas') || director.getScene().children[0];
        if (!this._uiRoot) {
            throw new Error('未找到UICanvas节点');
        }
        // 初始化所有层级节点
        this._layerDict.clear();
        // 只遍历数字枚举值
        for (let layer = 0; layer < Object.keys(UILayer).length / 2; layer++) {
            const layerName = UILayer[layer];
            let layerNode = this._uiRoot.getChildByName(layerName);
            if (!layerNode) {
                layerNode = new Node(layerName);
                this._uiRoot.addChild(layerNode);
            }
            this._layerDict.set(layer as UILayer, layerNode);
        }
        this._uiDict.clear();
        this._isInitialized = true;
        console.log('UIManager 初始化完成');
    }

    /** 打开UI界面 */
    public static async OpenUI(uiId: string, param?: any) {
        if (!this._isInitialized) {
            console.error('UIManager 未初始化');
            return;
        }
        if (this._uiDict.has(uiId)) {
            console.warn(`UI ${uiId} 已经打开`);
            return;
        }
        // 获取UI配置（直接调用UIIds.GetUIPath）
        const prefabPath = UIIds.GetUIPath(uiId);
        if (!prefabPath) {
            console.error(`UI ${uiId} 配置不存在`);
            return;
        }
        const uiNode = await UIViewFactory.CreateUIViewAsync(uiId);
        if (!uiNode) {
            console.error(`UI ${uiId} 创建失败`);
            return;
        }
        // 获取UI组件并设置层级
        const baseComponent = uiNode.getComponent(UIBaseComponent);
        const baseView = uiNode.getComponent(UIBaseView);
        if (baseComponent) {
            // @ts-ignore
            const parent = this._layerDict.get((baseComponent as any).UILayer) || this._uiRoot!;
            parent.addChild(uiNode);
            baseView?.OnInit(param);
        } else {
            console.error(`UI ${uiId} 未找到UIBaseComponent组件`);
            return;
        }
        uiNode.name = uiId;
        this._uiDict.set(uiId, uiNode);
        // 事件通知
        EventManager.Dispatch((EventIds as any).UIOpened || 'UIOpened', uiId, uiNode);
    }

    /** 关闭UI界面 */
    public static CloseUI(uiId: string) {
        if (!this._isInitialized) {
            console.error('UIManager 未初始化');
            return;
        }
        if (!this._uiDict.has(uiId)) {
            console.warn(`UI ${uiId} 未打开`);
            return;
        }
        const uiNode = this._uiDict.get(uiId)!;
        const baseView = uiNode.getComponent(UIBaseView);
        baseView?.OnClose();
        uiNode.destroy();
        this._uiDict.delete(uiId);
        // 事件通知
        EventManager.Dispatch((EventIds as any).UIClosed || 'UIClosed', uiId);
    }

    /** 获取UI节点 */
    public static GetUI(uiId: string): Node | null {
        if (!this._isInitialized) {
            console.error('UIManager 未初始化');
            return null;
        }
        return this._uiDict.get(uiId) || null;
    }

    /** 判断UI是否打开 */
    public static IsUIOpen(uiId: string): boolean {
        if (!this._isInitialized) {
            console.error('UIManager 未初始化');
            return false;
        }
        return this._uiDict.has(uiId);
    }

    /** 清理所有UI */
    public static Clear() {
        if (!this._isInitialized) {
            console.error('UIManager 未初始化');
            return;
        }
        for (const uiNode of this._uiDict.values()) {
            uiNode.destroy();
        }
        this._uiDict.clear();
    }

    /** 注销UI管理器 */
    public static Destroy() {
        this.Clear();
        this._layerDict.clear();
        this._uiRoot = null;
        this._isInitialized = false;
    }
} 