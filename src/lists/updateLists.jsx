class ListUpdaterClass {
    constructor(userID) {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws/?userID=${userID}`);
        this.handler = () => {console.log("handler has not been set")};
        this.socket.onopen = (e) => {
            this.receiveEvent("connected");
        }
        this.socket.onclose = (e) => {
            this.receiveEvent("disconnected");
        }
        this.socket.onmessage = async (msg) => {
            try {
                const event = await msg.data.text();
                this.receiveEvent(event);
            } catch {}
        }
    }
    
    sendEvent(event) {
        this.socket.send(event);
    }
    
    receiveEvent(event) {
        this.handler(event);
    }
    
    setHandler(h) {
        this.handler = h;
    }
}

// const ListUpdater = new ListUpdaterClass();
export {ListUpdaterClass};