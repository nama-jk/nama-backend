// api/getPolicies.js
import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Enable CORS
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { SHOPIFY_ADMIN_API_TOKEN, SHOPIFY_STORE } = process.env;

  const query = `
    {
      shop {
        policies {
          body
          title
          url
        }
      }
    }
  `;

//   try {
//     const response = await axios.post(
//       `https://${SHOPIFY_STORE}.myshopify.com/admin/api/2023-01/graphql.json`,
//       { query },
//       {
//         headers: {
//           'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.log(`api pw: ${SHOPIFY_ADMIN_API_TOKEN}, store: ${SHOPIFY_STORE}`);
//     console.error("Error making request:", error.response ? error.response.data : error);
//     res.status(500).json({ error: error.message });
//   }

  try {
    const response = await axios.get(`https://${SHOPIFY_STORE}.myshopify.com/admin/api/2023-10/policies.json`, {
        headers: {
            'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN,
            'Content-Type': 'application/json',
        },
    })
    res.status(200).json(response.data)
  } catch (error) {
    console.error("Error making request:", error.response ? error.response.data : error);
    res.status(500).json({ error: error.message })
  }
}
