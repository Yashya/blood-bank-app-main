const loginHandler = (app, db) => {
    app.post('/login/common', (req, res) => {
        const { username, password } = req.body;

        const sqlQuery = `
            SELECT 
                CASE 
                    WHEN u.user_id LIKE 'EMP%' THEN 'employee'
                    ELSE 'user'
                END AS role,
                CASE 
                    WHEN u.user_id LIKE 'EMP%' THEN '/login/emp/dash'
                    ELSE '/login/usr/dash'
                END AS redirectUrl 
            FROM users u
            JOIN credentials c ON u.user_id = c.id
            WHERE c.username = ? AND c.password = ?
            UNION
            SELECT 'hospital' AS role, '/login/hospital/dash' AS redirectUrl FROM hospitals h
            JOIN credentials c ON h.hospital_id = c.id
            WHERE c.username = ? AND c.password = ?;
        `;

        db.query(sqlQuery, [username, password, username, password], (err, result) => {
            if (err) {
                res.send({ message: "Error: " + err });
                return;
            }
            if (result.length > 0) {
                res.send({ success: true, role: result[0].role, message: "Login successful!", redirectUrl: result[0].redirectUrl });
            } else {
                res.send({ success: false, message: "Invalid credentials!" });
            }
        });
    });

    // New endpoint to search user_id based on username
    app.post('/searchUserId', (req, res) => {
        const { username } = req.body;

        const sqlQuery = `
            SELECT u.user_id
            FROM users u
            JOIN credentials c ON u.user_id = c.id
            WHERE c.username = ?;
        `;

        db.query(sqlQuery, [username], (err, result) => {
            if (err) {
                res.send({ success: false, message: "Error: " + err });
                return;
            }
            if (result.length > 0) {
                res.send({ success: true, userId: result[0].user_id });
            } else {
                res.send({ success: false, message: "User ID not found!" });
            }
        });
    });
};

export default loginHandler;
