// api/index.js
export default function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Enable CORS
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    res.status(200).send(`
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: 'Arial', sans-serif;">
            <h1>&copy; 2024 nama</h1>
        </div>
    `);
}
