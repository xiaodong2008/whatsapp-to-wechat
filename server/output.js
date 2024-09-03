import pc from "picocolors";

function addPrefix(head, msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}]`, `<${head}>`, ...msg);
}

function log() {
  addPrefix("log", arguments);
}

function success() {
  addPrefix(pc.green("success"), arguments);
}

function status() {
  addPrefix(pc.gray("status"), arguments);
}

function error() {
  addPrefix(pc.red("error"), arguments);
}

function warn() {
  addPrefix(pc.yellow("warn"), arguments);
}

export default {
  log,
  success,
  status,
  error,
  warn,
};
