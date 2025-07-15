import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Launch')
export class Launch extends Component {
    start() {
        // 初始化管理器
        // SceneManager.Instance.Init();
        // ResourceManager.Instance.Init();
        // UIManager.Instance.Init();
        // ConfigManager.Instance.Init();
        // GameData.Instance.Init();
        // TODO: 预加载资源、进入主界面等
    }

    update(deltaTime: number) {
        
    }
}


