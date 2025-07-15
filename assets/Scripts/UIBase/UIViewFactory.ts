/**
 * UIViewFactory
 * UI工厂，负责UI预制体与逻辑类的注册、异步加载、实例化和自动挂载
 * 适配自Unity实现，适用于Cocos Creator 3.x
 */
import { resources, Prefab, instantiate, Node, Component } from 'cc';
import { ResourceManager } from '../Core/ResourceManager';

export class UIViewFactory {
    // 存储UI预制体路径和对应逻辑类的映射
    private static _uiViewMap: Map<string, new () => Component> = new Map();

    /**
     * 注册UI预制体和对应的逻辑类
     * @param viewId 预制体名
     * @param viewClass 逻辑类构造函数
     */
    public static RegisterUIView(viewId: string, viewClass: new () => Component) {
        if (!this._uiViewMap.has(viewId)) {
            this._uiViewMap.set(viewId, viewClass);
        }
    }

    /**
     * 异步创建UI实例并挂载对应的逻辑类
     * @param viewId 预制体名
     * @param prefabPath 预制体资源路径
     * @returns 返回挂载了逻辑类的UI节点
     */
    public static async CreateUIViewAsync<T extends Component>(viewId: string, prefabPath: string): Promise<Node | null> {
        if (!this._uiViewMap.has(viewId)) {
            console.error(`UI预制体 ${viewId} 未注册对应的逻辑类`);
            return null;
        }
        // 异步加载预制体
        const prefab = await ResourceManager.LoadResAsync(prefabPath, Prefab);
        if (!prefab) {
            console.error(`加载预制体失败: ${prefabPath}`);
            return null;
        }
        // 实例化预制体
        const uiNode = instantiate(prefab);
        // 添加对应的逻辑类
        const viewClass = this._uiViewMap.get(viewId)!;
        uiNode.addComponent(viewClass);
        return uiNode;
    }
} 