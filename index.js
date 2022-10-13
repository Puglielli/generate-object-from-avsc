const commander = require('commander')
const GenerateJsonFlags = require('./generate-json/generate-json-flags')
const projectInfos = require('./package')
const Logger = require('./common/logger')

const logger = new Logger()
const command = new commander.Command()
const generateJsonFlags = new GenerateJsonFlags()

command.version(`${projectInfos.version}`, '-v, --version')
command.addCommand(generateJsonFlags.init())
const args = process.argv

// Local Test
// args.push("generate")
// args.push("-f")
// args.push("test.avsc")

command.parse(args)

const exec = () => {
    command.commands.forEach(
        subCommand => {
            if (subCommand.name() === 'generate') {
                generateJsonFlags.run(subCommand)
                    .then(data => console.log(data))
                    .catch(err => logger.error(err))
            }
        }
    )
}

exec()