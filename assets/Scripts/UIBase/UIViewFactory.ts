/**
 * UIViewFactory
 * UI工厂，负责UI预制体与逻辑类的注册、异步加载、实例化和自动挂载
 * 适配自Unity实现，适用于Cocos Creator 3.x
 */
import { resources, Prefab, instantiate, Node, Component } from 'cc';
import { ResourceManager } from '../Core/ResourceManager';
import { UIBaseView } from './UIBaseView';

export class UIViewFactory {
    // 2. 静态配置所有UI的viewId、预制体路径、逻辑类
    private static _uiViewMap: Map<string, { prefabPath: string, viewClass: new () => UIBaseView }> = new Map([
        // ['MainMenu', { prefabPath: 'Prefabs/MainMenu', viewClass: MainMenuView }],
        // ['SettingPanel', { prefabPath: 'Prefabs/SettingPanel', viewClass: SettingPanelView }],
        // ...继续添加其它UI
    ]);

    /**
     * 异步创建UI实例并挂载对应的逻辑类
     * @param viewId 唯一标识
     * @param param 传递给UI逻辑类的参数
     * @returns 返回挂载了逻辑类的UI节点
     */
    public static async CreateUIViewAsync(viewId: string, param?: any): Promise<Node | null> {
        const info = this._uiViewMap.get(viewId);
        if (!info) {
            console.error(`UI预制体 ${viewId} 未注册`);
            return null;
        }
        const { prefabPath, viewClass } = info;
        const prefab = await ResourceManager.LoadResAsync(prefabPath, Prefab);
        if (!prefab) {
            console.error(`加载预制体失败: ${prefabPath}`);
            return null;
        }
        const uiNode = instantiate(prefab);
        return uiNode;
    }
} 