import { _decorator, Node, Prefab, instantiate, resources } from 'cc';

export class UIManager {
    private static _instance: UIManager;
    public static get Instance(): UIManager {
        if (!this._instance) {
            this._instance = new UIManager();
        }
        return this._instance;
    }

    public Init() {
        // UI管理器初始化逻辑
    }

    public ShowUI(prefabPath: string, parent: Node) {
        resources.load(prefabPath, Prefab, (err, prefab) => {
            if (!err && prefab) {
                const ui = instantiate(prefab);
                parent.addChild(ui);
            }
        });
    }
} 