/**
 * UIComponentCollection
 * 组件集合，支持Map和Array两种模式，便于UI组件的统一管理和访问
 * 适配自Unity实现，适用于Cocos Creator 3.x
 */
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum CollectionType {
    Map = 0,
    Array = 1,
}

@ccclass('UIComponentCollection')
export class UIComponentCollection extends Component {
    @property({ type: [Component] })
    public components: Component[] = [];

    @property({ type: Number })
    public collectionType: CollectionType = CollectionType.Map;

    private _componentMap: Map<string, Component> = new Map();
    private _componentArray: Component[] = [];
    private _isInitialized: boolean = false;

    /** 初始化组件集合 */
    public Initialize() {
        if (this._isInitialized) return;
        this._componentMap = new Map();
        this._componentArray = [];
        for (const component of this.components) {
            if (component instanceof UIComponentCollection) {
                component.Initialize();
            }
            this.AddToCollection(component);
        }
        this._isInitialized = true;
    }

    /** 添加组件到集合 */
    private AddToCollection(component: Component) {
        if (this.collectionType === CollectionType.Map) {
            this._componentMap.set(component.node.name, component);
        } else {
            this._componentArray.push(component);
        }
    }

    /** 获取组件（通过名称） */
    public Get<T extends Component>(index: string): T | null {
        if (this.collectionType === CollectionType.Map && this._componentMap) {
            return (this._componentMap.get(index) as T) || null;
        }
        return null;
    }

    /** 获取组件（通过索引） */
    public GetByIndex<T extends Component>(index: number): T | null {
        if (this.collectionType === CollectionType.Array && this._componentArray) {
            if (index < this._componentArray.length) {
                return this._componentArray[index] as T;
            }
        }
        return null;
    }

    /** 获取Map迭代器 */
    public GetMapIterator(): IterableIterator<[string, Component]> {
        return this._componentMap.entries();
    }

    /** 获取数组迭代器 */
    public GetArrayIterator(): IterableIterator<Component> {
        return this._componentArray.values();
    }

    /** 获取通用迭代器 */
    public GetIterator(): IterableIterator<Component> {
        if (this.collectionType === CollectionType.Map) {
            return this._componentMap.values();
        } else {
            return this._componentArray.values();
        }
    }

    /** 获取组件数量 */
    public get Count(): number {
        if (this.collectionType === CollectionType.Map) {
            return this._componentMap.size;
        } else {
            return this._componentArray.length;
        }
    }

    /** 检查组件是否存在（通过名称） */
    public Check(component: Component, index: string): boolean {
        return this.Get<Component>(index) === component;
    }

    /** 检查组件是否存在（通过索引） */
    public CheckByIndex(component: Component, index: number): boolean {
        return this.GetByIndex<Component>(index) === component;
    }

    /** 添加组件 */
    public Add(component: Component) {
        this.AddToCollection(component);
        this.components.push(component);
    }
} 