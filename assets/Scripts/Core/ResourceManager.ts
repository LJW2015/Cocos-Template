import { _decorator, resources, Asset } from 'cc';

export class ResourceManager {
    private static _instance: ResourceManager;
    public static get Instance(): ResourceManager {
        if (!this._instance) {
            this._instance = new ResourceManager();
        }
        return this._instance;
    }

    public Init() {
        // 资源管理器初始化逻辑
    }

    public LoadRes<T extends Asset>(url: string, type: new () => T, callback: (err: Error | null, asset: T | null) => void) {
        resources.load(url, type, callback);
    }

    public ReleaseRes(asset: Asset) {
        if (asset && asset.uuid) {
            resources.release(asset.uuid);
        }
    }
} 