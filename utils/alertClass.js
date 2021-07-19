class AlertSnake {
  constructor(type, message, active) {
    this.type = type;
    this.message = message;
    this.active = active;
  }
  toggle() {
    this.active = true;
    let timeout = setTimeout(() => (this.active = false), 3000);
    return () => clearTimeout(timeout);
  }
}
module.exports = AlertSnake;
