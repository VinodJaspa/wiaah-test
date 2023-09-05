const scanner = require("sonarqube-scanner");
scanner(
  {
    serverUrl: "https://localhost:9000",
    login: "admin",
    password: "demo",
    options: {
      "sonar.sources": "./src",
    },
  },
  () => process.exit()
);
