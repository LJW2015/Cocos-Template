export class GameData {
    private static _instance: GameData;
    public static get Instance(): GameData {
        if (!this._instance) {
            this._instance = new GameData();
        }
        return this._instance;
    }

    public Init() {
        // 游戏数据初始化逻辑
    }

    // 可扩展：添加全局数据字段
} 