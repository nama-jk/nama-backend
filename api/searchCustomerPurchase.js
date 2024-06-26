// api/searchProduct.js
import { validateInput } from './utils.js';
import { graphqlQuery } from './graphqlUtils.js';

async function findProductInOrders(customerId, productId, cursor = null) {
  const query = `
    query getCustomerOrders($customerId: ID!, $productId: ID!, $cursor: String) {
      customer(id: $customerId) {
        orders(first: 10, after: $cursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              lineItems(first: 250) {
                edges {
                  node {
                    productId
                    title
                    quantity
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = { customerId, productId, cursor };
  const response = await graphqlQuery(query, variables);
  const orders = response.customer.orders.edges;

  for (const order of orders) {
    const lineItems = order.node.lineItems.edges;
    for (const item of lineItems) {
      if (item.node.productId === productId) {
        return { order: order.node, item: item.node }; // Found the product
      }
    }
  }

  if (response.customer.orders.pageInfo.hasNextPage) {
    return findProductInOrders(customerId, productId, response.customer.orders.pageInfo.endCursor);
  }

  return null; // Product not found
}

export default async (req, res) => {
  // Validate input (example)
  const { customerId, productId } = req.body;
  const validationErrors = validateInput({ customerId, productId });
  if (validationErrors) {
    return res.status(400).json({ error: validationErrors });
  }

  try {
    const productPurchase = await findProductInOrders(customerId, productId);
    if (productPurchase) {
      res.status(200).json({ message: 'Product purchase found', order: productPurchase.order, item: productPurchase.item });
    } else {
      res.status(404).json({ message: 'Product purchase not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// // api/searchProduct.js
// const { validateInput } = require('./utils');
// const { graphqlQuery } = require('./graphqlUtils');

// module.exports = async (req, res) => {
//   // Validate input (example)
//   const { customerId } = req.body;
//   const validationErrors = validateInput({ customerId });
//   if (validationErrors) {
//     return res.status(400).json({ error: validationErrors });
//   }

//   // Perform GraphQL query to Shopify (example)
//   const query = `
//     query {
//       customer(id: "${customerId}") {
//         orders(first: 1) {
//           edges {
//             node {
//               lineItems(first: 1) {
//                 edges {
//                   node {
//                     title
//                     quantity
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `;

//   try {
//     const orderData = await graphqlQuery(query);
//     res.status(200).json(orderData);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
