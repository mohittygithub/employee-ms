class ApiResponse {
  constructor(statusCode, recordId, message, success, noOfRecords, records) {
    this.statusCode = statusCode;
    this.recordId = recordId;
    this.message = message;
    this.success = success;
    this.noOfRecords = noOfRecords;
    this.records = records;
  }
}

module.exports = ApiResponse;
