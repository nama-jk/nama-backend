// api/addTag.js
import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Enable CORS
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { SHOPIFY_ADMIN_API_TOKEN, SHOPIFY_STORE } = process.env;
  const { customerId, tag } = req.body;

  const mutation = `
    mutation {
      customerUpdate(input: { id: "gid://shopify/Customer/${customerId}", tags: "${tag}" }) {
        customer {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      `https://${SHOPIFY_STORE}.myshopify.com/admin/api/2023-01/graphql.json`,
      { query: mutation },
      {
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
