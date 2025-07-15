/**
 * UIBaseComponent
 * 适配自Unity的UI基类，支持组件收集、事件自动绑定、异步加载、批量管理等
 * 使用方式与Unity类似，适配Cocos Creator 3.x
 */
import { _decorator, Component, Node, Button, Slider, EditBox, Toggle, Prefab, instantiate } from 'cc';
import { UIBaseView } from './UIBaseView';
import { UIComponentCollection } from './UIComponentCollection';
const { ccclass, property } = _decorator;

export enum UILayer {
    Background,
    Main,
    Popup,
    Tips,
}

@ccclass('UIBaseComponent')
export class UIBaseComponent extends Component {
    @property({ type: String })
    protected _uiName: string = '';
    @property({ type: Number })
    protected _uiLayer: UILayer = UILayer.Main;

    public get UIName() { return this._uiName; }
    public get UILayer() { return this._uiLayer; }

    protected _uiComponentCollection: UIComponentCollection | null = null;
    protected _uiBaseView: UIBaseView | null = null;

    public Init(uiBaseView: UIBaseView) {
        this._uiBaseView = uiBaseView;
        this._uiComponentCollection = this.getComponent(UIComponentCollection);
        if (this._uiComponentCollection) {
            this._uiComponentCollection.Initialize();
            this.RegistComponentEvents(this._uiComponentCollection);
        }
    }

    protected RegistComponentEvents(component: Component) {
        if (component instanceof UIComponentCollection) {
            for (const item of component.GetIterator()) {
                this.RegistComponentEvents(item);
            }
        }
        if (component instanceof Button) {
            component.node.on(Button.EventType.CLICK, () => {
                this.OnButtonClicked(component);
            }, this);
        }
        if (component instanceof Slider) {
            component.node.on('slide', (event: Event) => {
                this.OnSliderValueChanged(component, component.progress);
            }, this);
        }
        if (component instanceof EditBox) {
            component.node.on('text-changed', (event: Event) => {
                this.OnEditBoxValueChanged(component, component.string);
            }, this);
        }
        if (component instanceof Toggle) {
            component.node.on('toggle', (event: Event) => {
                this.OnToggleValueChanged(component, component.isChecked);
            }, this);
        }
    }

    protected OnButtonClicked(button: Button) {
        this._uiBaseView?.OnButtonClicked(button);
    }
    protected OnSliderValueChanged(slider: Slider, value: number) {
        this._uiBaseView?.OnSliderValueChanged(slider, value);
    }
    protected OnEditBoxValueChanged(editBox: EditBox, value: string) {
        this._uiBaseView?.OnInputFieldValueChanged(editBox, value);
    }
    protected OnToggleValueChanged(toggle: Toggle, value: boolean) {
        this._uiBaseView?.OnToggleValueChanged(toggle, value);
    }

    public Get<T extends Component>(path: string, type: new () => T): T | null {
        return this._uiComponentCollection?.Get<T>(path) || null;
    }
    public Check(component: Component, path: string): boolean {
        return this._uiComponentCollection?.Check(component, path) || false;
    }

    /**
     * 批量实例化组件集合
     */
    public UpdateInstanceCollectionArray(
        prefab: Prefab,
        parent: Node,
        count: number,
        callback?: (comp: UIComponentCollection, idx: number) => void
    ) {
        let children = parent.children;
        for (let i = 0; i < Math.max(children.length, count); i++) {
            let comp: UIComponentCollection | null = null;
            if (i < children.length) {
                comp = children[i].getComponent(UIComponentCollection);
            }
            if (i < count) {
                if (!comp) {
                    const node = instantiate(prefab);
                    parent.addChild(node);
                    comp = node.getComponent(UIComponentCollection);
                }
                if (comp) {
                    comp.node.active = true;
                    callback && callback(comp, i);
                }
            } else if (comp) {
                comp.node.active = false;
            }
        }
    }
}
