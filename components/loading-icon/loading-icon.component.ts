import { Component, ViviElement } from '@cspruit/vivi';

export class LoadingIconComponent extends Component {
    data: {
        id: string;
        default: string;
    }

    @ViviElement({ selector: 'span.icon' }) private icon: HTMLSpanElement;

    constructor() {
        super();
        this.template = require('./loading-icon.component.html');
        this.style = require('./loading-icon.component.scss');
    }

    load() {
        this.appListen('loading:' + this.data.id, this.setIcon);
        this.setIcon(this.data.default);
    }

    private setIcon(val: string) {
        this.element.hidden = false;
        switch (val) {
            case 'success':
                this.icon.className = 'fa fa-check success';
                break;
            case 'loading':
                this.icon.className = 'fa fa-spinner fa-spin pending';
                break;
            case 'error':
                this.icon.className = 'fa fa-times error';
                break;
            case 'none':
                this.element.hidden = true;
            // No break is intentional
            default:
                this.icon.className = 'fa fa-circle pending';
                break;
        }
    }
}