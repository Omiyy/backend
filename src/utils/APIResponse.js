class APIResponse {
  constructor(status, data, message) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}
export default APIResponse;