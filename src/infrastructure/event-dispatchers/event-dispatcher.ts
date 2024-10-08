interface Event {
  constructor: { name: string };
}

interface EventHandler {
  handle(event: Event): Promise<void> | void;
}

class EventDispatcher {
  private eventHandlers: { [key: string]: EventHandler[] };

  constructor() {
    this.eventHandlers = {};
  }

  register(eventType: string, handler: EventHandler): void {
    if (!this.eventHandlers[eventType]) {
      this.eventHandlers[eventType] = [];
    }
    this.eventHandlers[eventType].push(handler);
  }

  async dispatch(event: Event): Promise<void> {
    const handlers = this.eventHandlers[event.constructor.name];
    if (handlers) {
      for (const handler of handlers) {
        await handler.handle(event);
      }
    }
  }
}

export default new EventDispatcher();
