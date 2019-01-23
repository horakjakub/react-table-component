module.exports = {
    "rootDir": "",
    "setupTestFrameworkScriptFile": "<rootDir>/test/testSetup.js",
    "moduleFileExtensions": [
        "js",
        "json"
    ],
    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/fileMock.js",
        "\\.(css|scss)$": "<rootDir>/test/styleMock.js"
    }
}