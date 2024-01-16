import 'jest-environment-jsdom';
import 'jest-canvas-mock';
class HTMLElement {
    constructor() {
        this.style = {};
    }
}

class HTMLVideoElement extends HTMLElement {
    // Define any necessary properties/methods here
}

global.HTMLElement = HTMLElement;
global.HTMLVideoElement = HTMLVideoElement;