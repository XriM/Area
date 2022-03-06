const { pool } = require('../dbConfig')

exports.about = async (req, res) => {
    let json = {client: {}, server: {}}
    json.client = req.socket.remoteAddress
    const secondsSinceEpoch = Math.round(Date.now() / 1000)
    json.server = {current_time: secondsSinceEpoch, services: []}
    const services = await pool.query('SELECT * FROM services')
    for (const service of services.rows) {
        let actions = []
        const service_actions_ids = await pool.query('SELECT * FROM service_action WHERE service_id = $1', [service.id])
        for (const action of service_actions_ids.rows) {
            const service_action = await pool.query('SELECT * FROM actions WHERE id = $1', [action.action_id])
            actions.push({
                name: service_action.rows[0].name,
                description: service_action.rows[0].description,
            })
        }
        let reactions = []
        const service_reactions_ids = await pool.query('SELECT * FROM service_reaction WHERE service_id = $1', [service.id])
        for (const reaction of service_reactions_ids.rows) {
            const service_reaction = await pool.query('SELECT * FROM reactions WHERE id = $1', [reaction.reaction_id])
            reactions.push({
                name: service_reaction.rows[0].name,
                description: service_reaction.rows[0].description,
            })
        }
        const service_actions = await pool.query('SELECT * FROM actions WHERE id = $1', [service.id])
        json.server.services.push({
            name: service.name,
            actions: actions,
            reactions: reactions,
        });
    }
    res.status(200).send(json)
}