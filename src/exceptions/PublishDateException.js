class PublishDateException extends Error {
    constructor(message) {
      super(message);
      this.name = "PublishDateException";
    }
}

module.exports = {
    PublishDateException,
}