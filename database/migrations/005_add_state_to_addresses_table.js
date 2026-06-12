export async function up(db) {
    await db.query(`
        ALTER TABLE addresses
        ADD COLUMN state TEXT NULL
    `)
}

export async function down(db) {
    await db.query(`
        ALTER TABLE addresses
        DROP COLUMN state
    `)
}
