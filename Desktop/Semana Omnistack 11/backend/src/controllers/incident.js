import db from '../database';

export default {  
  async index(req, res){

    const { page = 1 } = req.query;

    const [count] = await db('incidents')
                          .count();
    
    const incidents 
      = await db('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((Number(page) - 1) * 5)
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

    res.header('X-Total-Count', count['count(*)'])
    return res.send(incidents);
  },
  async store(req, res){
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;
    
    const [id] = await db('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return res.send({id})
  },
  async delete(req, res){
    const id = req.params.id;
    const ong_id = req.headers.authorization;

    const incident = await db('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

      if(incident.ong_id !== ong_id) 
        return res.status(401).send({ error: "Operation not permitted." });
      
      await db('incidents').where('id', id).delete();

    return res.status(201).send();
  }
}