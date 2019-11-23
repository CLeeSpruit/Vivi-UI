import { Component, ViviElement, EventTypes } from '@cspruit/vivi';

export class EditableComponent extends Component {
    data: {
        id: string,
        value: any,
        alwaysEdit: boolean,
        hasButton: boolean,
        allowEmpty: boolean
    }

    @ViviElement({ selector: 'div.static'}) private staticDiv: HTMLSpanElement;
    @ViviElement({ selector: 'div.edit'}) private editDiv: HTMLDivElement;

    @ViviElement({ selector: 'span.static' }) private staticSpan: HTMLSpanElement;
    @ViviElement({ selector: 'span.fa-edit', eventType: EventTypes.click, handlerFnName: 'edit' }) private editButton: HTMLSpanElement;
    @ViviElement({ selector: 'input.edit', eventType: EventTypes.enter, handlerFnName: 'setValue'}) private input: HTMLInputElement;
    @ViviElement({ selector: 'span.fa-check', eventType: EventTypes.click, handlerFnName: 'setValue'}) private doneButton: HTMLSpanElement;

    constructor() {
        super();
        this.template = require('./editable.component.html');
        this.style = require('./editable.component.scss');
    }

    load() {
        if (this.data.alwaysEdit) {
            this.edit();
        }
    }

    edit() {
        this.staticDiv.hidden = true;
        this.editDiv.hidden = false;
    }

    setValue() {
        const value = this.input.value;

        if (value === '' && !this.data.allowEmpty) return;
        this.staticSpan.innerHTML = value;
        this.appEvents.sendEvent('edit:' + this.data.id, value);

        if (!this.data.alwaysEdit) {
            this.staticDiv.hidden = false;
            this.editDiv.hidden = true;
        }
    }
}