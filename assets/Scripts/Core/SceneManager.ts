import { _decorator, director } from 'cc';

export class SceneManager {
    private static _instance: SceneManager;
    public static get Instance(): SceneManager {
        if (!this._instance) {
            this._instance = new SceneManager();
        }
        return this._instance;
    }

    public Init() {
        // 场景管理器初始化逻辑
    }

    public LoadScene(sceneName: string, onLoaded?: () => void) {
        director.loadScene(sceneName, onLoaded);
    }
} 