import db from '../database';

export default {
  async login(req, res){
    const { id } = req.body;

    const ong = await db('ongs')
                      .where('id', id)
                      .select('name')
                      .first();
    if(!ong) return res.status(400).send({ error: "ONG not found." })

    return res.send(ong)
  },
}