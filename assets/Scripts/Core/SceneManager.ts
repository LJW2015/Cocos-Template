/**
 * 场景管理器
 * 负责场景切换、初始化和注销等操作
 * 使用方式：SceneManager.Init(); SceneManager.LoadScene('Main'); SceneManager.Destroy();
 */
import { _decorator, director } from 'cc';

export class SceneManager {
    /** 初始化场景管理器 */
    public static Init() {
        // 场景管理器初始化逻辑
    }

    /** 注销场景管理器 */
    public static Destroy() {
        // 场景管理器注销逻辑
    }

    /**
     * 加载场景
     * @param sceneName 场景名称
     * @param onLoaded 场景加载完成回调
     */
    public static LoadScene(sceneName: string, onLoaded?: () => void) {
        director.loadScene(sceneName, onLoaded);
    }
} 