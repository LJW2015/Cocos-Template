/**
 * LocalStorageManager
 * 本地持久化存储管理器，支持类型安全、命名空间、自动序列化
 * 用法：LocalStorageManager.Set('key', value); LocalStorageManager.Get('key');
 */
export class LocalStorageManager {
    /** 设置本地存储 */
    public static Set<T = any>(key: string, value: T, namespace: string = ''): void {
        const fullKey = namespace ? `${namespace}:${key}` : key;
        try {
            localStorage.setItem(fullKey, JSON.stringify(value));
        } catch (e) {
            console.error('LocalStorageManager.Set error:', e);
        }
    }

    /** 获取本地存储 */
    public static Get<T = any>(key: string, namespace: string = ''): T | null {
        const fullKey = namespace ? `${namespace}:${key}` : key;
        const str = localStorage.getItem(fullKey);
        if (str === null) return null;
        try {
            return JSON.parse(str) as T;
        } catch (e) {
            console.error('LocalStorageManager.Get error:', e);
            return null;
        }
    }

    /** 移除本地存储 */
    public static Remove(key: string, namespace: string = ''): void {
        const fullKey = namespace ? `${namespace}:${key}` : key;
        localStorage.removeItem(fullKey);
    }

    /** 清空所有本地存储（可选命名空间） */
    public static Clear(namespace: string = ''): void {
        if (!namespace) {
            localStorage.clear();
        } else {
            const keys: string[] = [];
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k && k.startsWith(namespace + ':')) {
                    keys.push(k);
                }
            }
            for (const k of keys) {
                localStorage.removeItem(k);
            }
        }
    }
} 