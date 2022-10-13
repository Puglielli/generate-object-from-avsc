const {Command} = require("commander");
const {getFile} = require("../common/file-utils");
const {exec} = require("./generate-json");
const {parseJson} = require("../common/utils");

class GenerateJsonFlags {
    constructor() {
    }

    init = () => {
        const cmd = new Command('generate')

        cmd
            .option('-f, --schema-file <string>', 'Schema file path.')
        // .option('-s, --schema-string <string>', 'String of schema avsc.') // TODO Implement
        // .option('-i, --schema-input <stdin>', 'Stdin of schema avsc.' ) // TODO Implement

        return cmd
    }

    run = async (command) => {
        const options = command.opts()
        const str = getFile(options.schemaFile)
        const json = parseJson(str)

        return exec(json)
    }

}

module.exports = GenerateJsonFlags
