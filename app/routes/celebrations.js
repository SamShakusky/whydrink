const express = require('express');
const { google } = require('googleapis');

// const { key, spreadsheetId } = require('../../keys/sheetsAPI');

const key = process.env.API_KEY;
const spreadsheetId = process.env.SPREADSHEET_ID;

const router = express.Router();

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();

router.get('/', async function(req, res) {
    const { locale } = req.query;
    
    const sheets = google.sheets('v4');
    
    const sheet = `${locale}-${currentMonth + 1}`;
    const range = `A${currentDay}:J${currentDay}`;
    
    sheets.spreadsheets.values.get(
      {
        range: `${sheet}!${range}`,
        spreadsheetId,
        key,
      },
      (error, response) => {
        if (error) {
          console.error('The API returned an error.');
          throw error;
        }
        
        res.send(...response.data.values);
      }
    );
});

module.exports = router;
