const response = (statusCode, message, datas, res) => {
  res.status(statusCode).json({
    message,
    payload: {
      data: datas,
    },
    metadata: {
      next: "",
      current: "",
      prev: "",
    },
  });
};

module.exports = response;
