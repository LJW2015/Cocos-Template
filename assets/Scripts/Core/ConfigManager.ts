/**
 * 配置管理器
 * 负责配置数据的加载、获取、初始化和注销
 * 使用方式：ConfigManager.Init(); ConfigManager.LoadConfig(...); ConfigManager.Destroy();
 */
import { _decorator, resources, JsonAsset } from 'cc';
import { ResourceManager } from './ResourceManager';

export class ConfigManager {
    /** 配置缓存 */
    private static _configs: Map<string, any> = new Map();

    /** 初始化配置管理器 */
    public static Init() {
        // 配置管理器初始化逻辑
    }

    /** 注销配置管理器，清空所有缓存 */
    public static Destroy() {
        this._configs.clear();
    }

    /**
     * 加载配置文件
     * @param configPath 配置文件路径
     * @param callback 加载完成回调，返回配置数据
     */
    public static async LoadConfig(configPath: string, callback: (data: any) => void) {
        const asset = await ResourceManager.LoadResAsync(configPath, JsonAsset);
        if (asset) {
            this._configs.set(configPath, asset.json);
            callback(asset.json);
        }
    }

    /**
     * 获取已加载的配置数据
     * @param configPath 配置文件路径
     * @returns 配置数据
     */
    public static GetConfig(configPath: string): any {
        return this._configs.get(configPath);
    }
} 