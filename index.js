const envConfigs = require('./src/config/env');
const { initModels } = require('./src/models');
const apiRoutes = require('./src/routes/apiRoutes');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = envConfigs.processEnv.PORT || 3000;
const loggerMiddleware = (req, res, next) => {
    const now = new Date();
    const logEntry = `[${now.toLocaleDateString()} ${now.toLocaleTimeString()}] ${req.method} ${req.url}\n`;
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFile(path.join(logsDir, 'log.txt'), logEntry, (err) => {
        if (err) console.error('Error writing log:', err);
    });
    next();
};
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRoutes);
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'MarcoolStoreHub - Módulo 8 (Final)'
    });
});
app.get('/status', (req, res) => {
    res.json({
        status: 'Server is running',
        module: 'Módulo 8 JS (Final Project)',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.use(require('./src/middlewares/errorMiddleware'));

const startServer = async () => {
    try {
        await initModels(); 
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT} camarada`);
            console.log(`Rutas de API correctas en /api`);
        });
    } catch (error) {
        console.error('CRITICAL: Server initialization failed:', error);
    }
};
startServer();
