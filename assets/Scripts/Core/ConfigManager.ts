import { _decorator, resources, JsonAsset } from 'cc';

export class ConfigManager {
    private static _instance: ConfigManager;
    public static get Instance(): ConfigManager {
        if (!this._instance) {
            this._instance = new ConfigManager();
        }
        return this._instance;
    }

    private _configs: Map<string, any> = new Map();

    public Init() {
        // 配置管理器初始化逻辑
    }

    public LoadConfig(configPath: string, callback: (data: any) => void) {
        resources.load(configPath, JsonAsset, (err, asset) => {
            if (!err && asset) {
                this._configs.set(configPath, asset.json);
                callback(asset.json);
            }
        });
    }

    public GetConfig(configPath: string): any {
        return this._configs.get(configPath);
    }
} 