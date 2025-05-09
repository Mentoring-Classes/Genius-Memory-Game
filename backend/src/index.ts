import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Carrega as variáveis de ambiente
dotenv.config()

// Inicializa o app Express
const app = express()
const PORT = process.env.PORT || 8000

// Configuração de CORS
const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [
	'http://localhost:3000',
	'https://danielobara.github.io',
]

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		},
		credentials: true,
	}),
)

// Middleware para parsing do corpo das requisições
app.use(express.json())

// Rota básica para verificar se o servidor está funcionando
app.get('/', (req, res) => {
	res.json({
		message: 'API do Genius Memory Game está funcionando!',
		environment: process.env.NODE_ENV,
		timestamp: new Date().toISOString(),
	})
})

// Rota de health check (útil para o Render e outros serviços de hosting)
app.get('/health', (req, res) => {
	res.status(200).send('OK')
})

// Inicializa o servidor
app.listen(PORT, () => {
	console.log(
		`🚀 Servidor rodando na porta ${PORT} em modo ${process.env.NODE_ENV || 'development'}`,
	)
})
