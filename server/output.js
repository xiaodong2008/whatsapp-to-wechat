import pc from "picocolors";

function addPrefix(head, msg) {
  const time = new Date().toLocaleTimeString();
  return `[${time}] <${head}> ${msg}`;
}

function log(msg) {
  console.log(addPrefix("log", msg));
}

function success(msg) {
  console.log(pc.green(addPrefix("success", msg)));
}

function status(msg) {
  console.log(pc.gray(addPrefix("status", msg)));
}

function error(msg) {
  console.error(pc.red(addPrefix("error", msg)));
}

function warn(msg) {
  console.warn(pc.yellow(addPrefix("warn", msg)));
}

export default {
  log,
  success,
  status,
  error,
  warn,
};
