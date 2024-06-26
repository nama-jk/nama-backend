// api/graphqlUtils.js
import fetch from 'node-fetch';

export const graphqlQuery = async (query) => {
  const response = await fetch(`https://your-shopify-store.myshopify.com/api/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('GraphQL request failed');
  }

  return response.json();
};