import * as fse from 'fs-extra'
import * as inquirer from 'inquirer'
import { config } from './config'

async function register() {
  const answers = await inquirer.prompt<any>([
    {
      type: 'input',
      name: 'serviceName',
      default: 'sample',
      message: 'service name',
    },
    {
      type: 'input',
      name: 'port',
      default: 3000,
      message: 'port',
    },
  ])

  const serviceName = answers.serviceName
  const port = answers.port
  const filePath = `${config.url}/${port}.${serviceName}.config`
  if (fse.existsSync(filePath)) {
    console.log(`port ${port} has been used!`)
    return
  }
  const file = await fse.readFile(__dirname + '/../../templates/nginx.config')
  const str = file
    .toString()
    .replace(/\${service_name}/g, serviceName)
    .replace(/\${port}/, port)
    .replace(/\${domain}/, config.domain)
  await fse.outputFile(filePath, str)
  console.log(`${filePath}, success\n`)
  console.log(`please reload nginx`)
}

export { register }
