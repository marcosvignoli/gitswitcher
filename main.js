import { config } from "dotenv";

config();
// how to use this script:
// you need to run the command "node main.js <arg>"
// the current accepted args are: Personal or Work

// read the data.json to tell which is the current account saved
import { exec } from "node:child_process";

const arg = process.argv[2];
// this is something that windows requests it can be anything, its not the same as the user setted for git
// this can be extended to have "personal" and "work" as username to distinguish the two accounts

// delete keys
function deleteKey(username) {
  exec("cmdkey /delete:git:https://github.com");
  exec(`cmdkey /delete:git:https://${username}@github.com`);
}

if (arg === "personal") {
  deleteKey("personal");
  console.log("the arg is: ", arg);
  exec(
    `cmdkey /generic:git:https://github.com /user:personal /pass:${process.env.personal}`
  );
}
if (arg === "work") {
  deleteKey("work");
  exec(
    `cmdkey /generic:git:https://github.com /user:work /pass:${process.env.work}`
  );
  console.log("the arg is: ", arg);
}

if (arg) {
  console.log(
    "you are passing something that its not being handled, double check if this is what you want to send: ",
    arg
  );
}
// create account
