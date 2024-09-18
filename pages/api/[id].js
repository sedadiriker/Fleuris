import dbConnect from '../../util/dbConnect'; 
import Product from '../../models/Flower'; 

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
      }
      break;

    case 'PUT':
      try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
      }
      break;

    case 'DELETE':
      try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
