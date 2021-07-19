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

// Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/items', require('./routes/items'))
app.use('/api/renter', require('./routes/renters'))

// Admin routes
app.use('/api/admin/categories', require('./routes/admin/categories'))
app.use('/api/admin/subCategories', require('./routes/admin/subCategories'))

// 404 not found
app.use((req, res) =>
    res.status(404).json({
        success: false,
        message: `404 Not found: ${req.url} does not exist`,
    })
)

// Error handling
app.use((err, req, res) =>
    res.status(err.status || 500).json({
        success: false,
        message: err.message,
    })
)

const PORT = process.env.PORT || 5000

db.sequelize
    .sync()
    .then(() => {
        console.log(`${chalk.green('✓')} ${chalk.blue(`Database synced`)}`)
    })
    .catch((err) => {
        console.log(err)
    })

module.exports = app.listen(PORT, () =>
    console.log(
        `${chalk.green('✓')} ${chalk.blue(
            `Listening on http://localhost:${PORT}/.`
        )}`
    )
)
