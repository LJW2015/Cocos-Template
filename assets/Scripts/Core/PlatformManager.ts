/**
 * PlatformManager
 * 平台管理器，统一处理平台差异、能力检测、平台初始化等
 * 用法：PlatformManager.IsWeb(), PlatformManager.IsNative(), PlatformManager.GetPlatformName()
 */
export class PlatformManager {
    /** 判断是否Web平台 */
    public static IsWeb(): boolean {
        return typeof window !== 'undefined' && typeof window.document !== 'undefined';
    }

    /** 判断是否原生平台（Cocos原生/小游戏等） */
    public static IsNative(): boolean {
        // Cocos Creator 3.x原生平台判断
        // @ts-ignore
        return typeof jsb !== 'undefined' || typeof window['wx'] !== 'undefined';
    }

    /** 判断是否微信小游戏 */
    public static IsWeChat(): boolean {
        // @ts-ignore
        return typeof window !== 'undefined' && typeof window['wx'] !== 'undefined';
    }

    /** 获取平台名称 */
    public static GetPlatformName(): string {
        if (this.IsWeChat()) return 'WeChat';
        if (this.IsNative()) return 'Native';
        if (this.IsWeb()) return 'Web';
        return 'Unknown';
    }

    /** 平台初始化（可扩展） */
    public static Init(): void {
        // 可根据平台做初始化操作
        console.log('PlatformManager Init, 当前平台:', this.GetPlatformName());
    }
} 