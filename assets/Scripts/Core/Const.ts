/**
 * 游戏常量配置文件
 * 用于统一管理游戏内所有常量、事件ID、配置项等
 * 示例：EventIds
 */

export class EventIds {
    /** 测试事件 */
    public static readonly TestEvent = "TestEvent";
    // 在此添加更多事件ID...
}

/**
 * UI唯一标识与预制体路径配置
 */
export class UIIds {
    // 示例：主界面
    public static readonly MainMenu = "MainMenu";
    // 你可以继续添加更多UI唯一标识

    // UI路径映射表
    private static _uiPathMap: { [key: string]: string } = {
        [UIIds.MainMenu]: "Prefabs/MainMenu", // 示例
        // 继续添加更多UIId与路径的映射
    };

    /**
     * 获取UI的预制体路径
     * @param uiId UI唯一标识
     */
    public static GetUIPath(uiId: string): string {
        return this._uiPathMap[uiId] || "";
    }
}

// 可继续扩展其他常量类，如：
// export class GameConfig { ... }
// export const SOME_CONST = 123; 