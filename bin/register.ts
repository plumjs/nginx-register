#!/usr/bin/env node

import * as commander from "commander"
import { register } from "../src/index"
const pg = require("../../package.json")


const program = new commander.Command()
program.version(pg.version);

program
    .option('-r, --register', 'register an config')

program.parse(process.argv);

if (program.register) register()
else program.help()
