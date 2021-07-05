const express = require('express')
const morgan = require('morgan')
const chalk = require('chalk')
const cors = require('cors')
const db = require('./models')

const app = express()

// .env configuration
require('dotenv').config()

// Middleware
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

const PORT = process.env.PORT || 5000

db.sequelize
    .sync()
    .then(() =>
        app.listen(PORT, () =>
            console.log(
                `${chalk.green('✓')} ${chalk.blue(
                    `Listening on http://localhost:${PORT}/.`
                )}`
            )
        )
    )
