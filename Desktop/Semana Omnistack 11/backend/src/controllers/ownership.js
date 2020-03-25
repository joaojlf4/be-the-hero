import db from '../database';

export default {
  async index(req, res){
    const ong_id = req.headers.authorization;
    const { page = 1 } = req.query;

    const incidents = await db('incidents')
                      .where('ong_id', ong_id)
                      .limit(5)
                      .offset((page - 1) * 5)
                      .select('*');

    
    return res.send(incidents);
  }
}