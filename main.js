import { config } from "dotenv";
import { exec } from "node:child_process";
import os from "os";

config();
// how to use this script:
// you need to run the command "node main.js <arg>"
// the current accepted args are: Personal or Work

const personal = process.env.personal;
const work = process.env.work;

const arg = process.argv[2];

function detectOS() {
	const platform = os.platform();

	if (platform === "win32") {
		return "Windows";
	} else if (platform === "darwin") {
		return "macOS";
	} else if (platform === "linux") {
		return "Linux";
	} else {
		return "Unknown OS";
	}
}

const currentOS = detectOS();
console.log(`Current Operating System: ${currentOS}`);

if (currentOS === "Windows") {
	// delete keys
	function deleteKey(target) {
		// this works only for windows right now
		exec(`cmdkey /delete:${target}`, (error, output) => {
			console.log(error);
			console.log(output);
		});
	}

	function createKey(username, key) {
		// the exec accepts a command and a callback to handle the error and output of the command
		exec(
			`cmdkey /generic:git:https://github.com /user:${username} /pass:${key}`,
			(error, output) => {
				if (error) {
					console.log("there's an error while creating the key: ", error);
				}
				if (output) {
					console.log("output while creating the key", output);
				}
			}
		);
	}

	async function searchKeys() {
		const output = await new Promise((resolve, reject) => {
			exec("cmdkey /list", (error, output) => {
				if (error) {
					reject(error);
				} else {
					resolve(output);
				}
			});
		});

		// splitting the result of the output with a blank space
		const keysList = output.split(" ");

		keysList.map((key) => {
			// if the key has a target spit it by the equal sign to get the target
			if (key.includes("target=")) {
				const target = key.split("=");
				// if target[1] has something related to github, push it to the variable "keys"
				if (target[1].includes("github")) {
					deleteKey(target[1]);
				}
			}
		});
	}

	(async () => {
		await searchKeys();
		if (arg === "personal") {
			createKey("personal", personal);
		}
		if (arg === "work") {
			createKey("work", work);
		}
	})();
}

if (currentOS === "macOS") {
	console.log("you are in mac");
	// delete account in mac
	// exec(`security delete-internet-password -s github.com`, (error, output) => {
	// 	if (error) {
	// 		console.log(error);
	// 	}
	// 	if (output) {
	// 		console.log(output);
	// 	}
	// 	console.log("account deleted");
	// });
	// create account in mac
	// exec(
	// 	`security add-internet-password -a "marcosvignoli" -s "github.com" -w ${personal}`,
	// 	(error, output) => {
	// 		if (error) {
	// 			console.log(error);
	// 		}
	// 		if (output) {
	// 			console.log(output);
	// 		}
	// 		console.log("account created");
	// 	}
	// );
}
