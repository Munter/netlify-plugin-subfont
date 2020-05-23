class Logger {
  constructor() {
    this._log = [];
  }

  log(message, data) {
    console.log(message);
    this.debug(message, data);
  }

  debug(message, data) {
    this._log.push([message, data]);
  }

  inspect() {
    console.log(this._log);
  }

  toString() {
    const logOutput = this._log.map(([message, data]) => {
      if (!data) {
        return message;
      }

      const stringified = JSON.stringify(data, null, 2);

      return `${message}: ${stringified}`;
    });

    return `### LOG: ###
${logOutput.join('\n\n')}
`;
  }
}

module.exports = Logger;
