/**
 * 事件系统统一管理类
 * 使用方法：
 * 1. 注册事件：EventManager.Regist(EventIds.TestEvent, OnTestEvent);
 * 2. 派发事件：EventManager.Dispatch(EventIds.TestEvent, "Hello Event!");
 * 3. 反注册事件：EventManager.UnRegist(EventIds.TestEvent, OnTestEvent);
 */
export class EventManager {
    /** 事件回调存储结构，数组存储，保证顺序 */
    private static _eventMap: Map<string | number, Function[]> = new Map();

    /** 注册事件 */
    public static Regist(eventId: string | number, callback: Function) {
        if (!this._eventMap.has(eventId)) {
            this._eventMap.set(eventId, []);
        }
        const arr = this._eventMap.get(eventId)!;
        if (arr.indexOf(callback) === -1) {
            arr.push(callback);
        }
    }

    /** 派发事件 */
    public static Dispatch(eventId: string | number, ...args: any[]) {
        const arr = this._eventMap.get(eventId);
        if (arr) {
            // 拷贝一份，防止回调内增删影响遍历
            for (const cb of arr.slice()) {
                try {
                    cb(...args);
                } catch (e) {
                    console.error(`[EventManager] 事件回调异常:`, e);
                }
            }
        }
    }

    /** 反注册事件 */
    public static UnRegist(eventId: string | number, callback: Function) {
        const arr = this._eventMap.get(eventId);
        if (arr) {
            const idx = arr.indexOf(callback);
            if (idx !== -1) {
                arr.splice(idx, 1);
            }
            if (arr.length === 0) {
                this._eventMap.delete(eventId);
            }
        }
    }

    /** 清空所有事件（可用于注销） */
    public static Destroy() {
        this._eventMap.clear();
    }
} 