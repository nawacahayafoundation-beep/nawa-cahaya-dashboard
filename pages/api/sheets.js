import { google } from 'googleapis';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_SHEETS_API_KEY });

        try {
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.SPREADSHEET_ID,
                range: 'Sheet1!A1:C10', // Adjust range as needed
            });

            const rows = response.data.values;
            if (rows.length) {
                res.status(200).json(rows);
            } else {
                res.status(404).json({ message: 'No data found.' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}