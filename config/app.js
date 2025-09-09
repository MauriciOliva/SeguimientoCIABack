'use strict'

import express from "express"
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import agendaRoutes from "../src/Agenda/Agenda.routes.js"
import rutasHealth from "../src/Agenda/rutas.healt.js"

const config = (app) => {

    const corsOptions = {
        origin: [
            'https://seguimiento-cia-back.vercel.app',
            'seguimiento-cia.vercel.app'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // ✅ Agregar PATCH
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
        optionsSuccessStatus: 200
    };

    app.use(cors(corsOptions))
    app.options('*', cors(corsOptions)); // Habilitar preflight para todas las rutas
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app) => {
    app.use('/api/v1/agenda', agendaRoutes)
    app.use('/health', rutasHealth)
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