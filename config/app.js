'use strict'

import express from "express"
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import agendaRoutes from "../src/Agenda/Agenda.routes.js"

const config = (app) => {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app) => {
    app.use('/api/v1/agenda', agendaRoutes)
}

export const initServer = () => {
    const app = express()
    try {
        config(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server listening on port ${process.env.PORT}`)
    } catch (error) {
        console.log('server error: ', error)
    }
}