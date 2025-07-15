/**
 * 资源管理器
 * 统一管理资源的加载、释放、初始化和注销
 * 使用方式：ResourceManager.Init(); ResourceManager.LoadRes(...); ResourceManager.Destroy();
 */
import { _decorator, resources, Asset } from 'cc';

export class ResourceManager {
    /** 初始化资源管理器 */
    public static Init() {
        // 资源管理器初始化逻辑
    }

    /** 注销资源管理器 */
    public static Destroy() {
        // 资源管理器注销逻辑
    }

    /**
     * 异步加载资源（Promise风格）
     * @param url 资源路径
     * @param type 资源类型
     * @returns Promise<T|null>
     */
    public static LoadResAsync<T extends Asset>(url: string, type: new () => T): Promise<T | null> {
        return new Promise((resolve, reject) => {
            resources.load(url, type, (err, asset) => {
                if (err || !asset) {
                    resolve(null);
                } else {
                    resolve(asset as T);
                }
            });
        });
    }

    /**
     * 释放资源
     * @param asset 要释放的资源对象
     */
    public static ReleaseRes(asset: Asset) {
        if (asset && asset.uuid) {
            resources.release(asset.uuid);
        }
    }
} 