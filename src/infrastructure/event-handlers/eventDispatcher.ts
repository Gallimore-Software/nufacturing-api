class EventDispatcher {
  constructor() {
    this.eventHandlers = {};
  }

  register(eventType, handler) {
    if (!this.eventHandlers[eventType]) {
      this.eventHandlers[eventType] = [];
    }
    this.eventHandlers[eventType].push(handler);
  }

  async dispatch(event) {
    const handlers = this.eventHandlers[event.constructor.name];
    if (handlers) {
      for (const handler of handlers) {
        await handler.handle(event);
      }
    }
  }
}

module.exports = new EventDispatcher();
