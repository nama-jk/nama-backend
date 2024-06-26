// api/getCustomer.js
import { validateInput } from './utils.js';
import { graphqlQuery } from './graphqlUtils.js';

export default async (req, res) => {
  // Validate input (example)
  const { id } = req.query;
  const validationErrors = validateInput({ id });
  if (validationErrors) {
    return res.status(400).json({ error: validationErrors });
  }

  // Perform GraphQL query to Shopify (example)
  const query = `
    query {
      customer(id: "${id}") {
        id
        firstName
        lastName
        email
      }
    }
  `;

  try {
    const customerData = await graphqlQuery(query);
    res.status(200).json(customerData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// // api/getCustomer.js
// const { validateInput } = require('./utils');
// const { graphqlQuery } = require('./graphqlUtils');

// module.exports = async (req, res) => {
//   // Validate input (example)
//   const { id } = req.query;
//   const validationErrors = validateInput({ id });
//   if (validationErrors) {
//     return res.status(400).json({ error: validationErrors });
//   }

//   // Perform GraphQL query to Shopify (example)
//   const query = `
//     query {
//       customer(id: "${id}") {
//         id
//         firstName
//         lastName
//         email
//       }
//     }
//   `;

//   try {
//     const customerData = await graphqlQuery(query);
//     res.status(200).json(customerData);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
