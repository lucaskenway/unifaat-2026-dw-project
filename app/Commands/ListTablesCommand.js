import postgres from '../../database/connections/postgres.js'

export default {
    name: 'list-tables',
    alias: 'listar-tabelas',
    description: 'Lista as tabelas do banco de dados',

    async handle() {
        try {
            const result = await postgres.query(`
                SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = 'public'
                  AND table_type = 'BASE TABLE'
                ORDER BY table_name
            `)

            if (result.rows.length === 0) {
                console.log('Nenhuma tabela encontrada.')
                return
            }

            console.log('Tabelas encontradas:')

            for (const row of result.rows) {
                console.log(row.table_name)
            }
        } finally {
            await postgres.close()
        }
    }
}
