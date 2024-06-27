import axios from 'axios';

export default async (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // // preflight request
    // if (req.method === 'OPTIONS') {
    //     res.status(200).end();
    //     return;
    // }

    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        res.status(200).json(response.data);
    } catch(error) {
        console.error("Function invocation failed!:", error);
        res.status(500).json({ error: error.message });
    }
}