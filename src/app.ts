import 'reflect-metadata'
import 'express-async-errors'
import cors from 'cors'
import { errors } from 'celebrate'
import express from 'express'

export const app = express()

app.use(express.json())
app.use(cors())

app.use(errors())
