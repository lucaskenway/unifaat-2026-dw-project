import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Middleware para registrar logs de todas as chamadas à API.
 * 
 * Registra cada chamada em:
 * - Console (console.log)
 * - Arquivo ./storage/logs/log.txt
 * 
 * Formato: [data iso] Metodo :: Rota
 * Exemplo: [2026-05-21T14:30:00.000Z] GET :: /courses
 */
export default function LogMiddleware(request, response, next) {
    try {
        const now = new Date().toISOString();
        const method = request.method;
        const route = request.originalUrl.split('?')[0]; // Remove query params
        
        const logMessage = `[${now}] ${method} :: ${route}`;
        
        // Log no console
        console.log(logMessage);
        
        // Caminho do arquivo de log
        const logFilePath = path.resolve(__dirname, '../../../storage/logs/log.txt');
        
        // Cria o diretório se não existir
        const logDir = path.dirname(logFilePath);
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        
        // Escreve no arquivo de log (append mode)
        fs.appendFileSync(logFilePath, logMessage + '\n', 'utf8');
        
        // Permite que a requisição continue normalmente
        next();
    } catch (error) {
        console.error('Erro ao registrar log:', error);
        // Continua mesmo se houver erro no log
        next();
    }
}
