import { _decorator, Component, Node } from 'cc';
import { SceneManager } from './Core/SceneManager';
import { ResourceManager } from './Core/ResourceManager';
import { UIManager } from './Core/UIManager';
import { ConfigManager } from './Core/ConfigManager';
import { GameData } from './Core/GameData';
const { ccclass, property } = _decorator;

@ccclass('Launch')
export class Launch extends Component {
    start() {
        // 按顺序初始化所有管理器
        ConfigManager.Init();
        ResourceManager.Init();
        SceneManager.Init();
        UIManager.Init();
        GameData.Init();
        // TODO: 预加载资源、进入主界面等
    }

    onDestroy() {
        GameData.Destroy();
        UIManager.Destroy();
        SceneManager.Destroy();
        ResourceManager.Destroy();
        ConfigManager.Destroy();
    }
}


