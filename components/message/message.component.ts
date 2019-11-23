import { Component, ViviElement } from '@cspruit/vivi';

export class MessageComponent extends Component {
    data: {
        id: string;
    };

    @ViviElement({ selector: 'ul.error-message'}) messagesUL: HTMLUListElement;

    constructor() {
        super();
        this.template = require('./message.component.html');
        this.style = require('./message.component.scss');
    }

    load() {
        this.appListen('message:' + this.data.id, this.createMessage);
        this.appListen('message:clear:' + this.data.id, this.clearMessages);
        this.element.hidden = true;
    }

    private clearMessages() {
        this.messagesUL.innerHTML = null;
        this.element.hidden = true;
    }

    private createMessage(data: { message: string, type: string }) {
        this.element.hidden = false;
        const li = document.createElement('li');
        const iconEl = document.createElement('span');
        if (data && data.type === 'success') {
            iconEl.className = 'fa fa-checkmark success';
        } else if (data && data.type === 'error') {
            iconEl.className = 'fa fa-exclamation-triangle error';
        } else {
            iconEl.className = 'fa fa-info-circle info';
        }
        const messageEl = document.createElement('span');
        messageEl.innerText = data.message;
        li.appendChild(iconEl);
        li.appendChild(messageEl);
        this.messagesUL.appendChild(li);
    }
}