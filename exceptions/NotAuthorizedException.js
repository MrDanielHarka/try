class NotAuthorizedException extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotAuthorizedException';
  }
}

export default NotAuthorizedException;