import dbConnect from '../../util/dbConnect'; 
import Product from '../../models/Flower'; 

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const products = await Product.find({});
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
      }
      break;

    case 'POST':
      try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
