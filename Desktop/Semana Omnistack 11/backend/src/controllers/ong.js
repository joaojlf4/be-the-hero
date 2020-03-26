import crypto from 'crypto';
import db from '../database';

export default {
  async index(req, res){
    try{
      const { page = 1 } = req.query;

      const ongs 
        = await db('ongs')
          .limit(5)
          .offset((page - 1) * 5)
          .select('*');

      return res.send(ongs);
    }catch(err){
      return res.status(404).send(err);
    }
  },
  async store(req, res){
    try{
      const { name, email, whatsapp, city, uf } = req.body;
      const id = crypto.randomBytes(4).toString('hex');
    
      await db('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
      });
    
      return res.send({id, name})
    }catch(err){
      return res.status(404).send(err);
    }
  },
  async delete(req, res){
    const { id } = req.params;
    await db('ongs').where('id', id).delete();

    return res.status(201).send();
  }
}