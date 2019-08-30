const express = require('express');
const { google } = require('googleapis');
const GoogleSpreadsheet = require('google-spreadsheet');

const isDevMode = process.env.NODE_ENV === 'dev';

const key = isDevMode ? require('../../keys/sheetsAPI').key : process.env.API_KEY;
const spreadsheetId = isDevMode ? require('../../keys/sheetsAPI').spreadsheetId : process.env.SPREADSHEET_ID;

const credentials = isDevMode ? require('../../keys/service-account.json') : {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY,
};

const spreadsheet = new GoogleSpreadsheet(spreadsheetId);


const router = express.Router();

const currentDate = new Date();
// const offset = (UTCDate.getTimezoneOffset() * 60 * 1000 * -1);

// const currentDate = new Date(UTCDate.getTime() + offset);

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


const request = require("request");
const cheerio = require("cheerio");

router.get('/grab/', async function(req, res) {
//   for (let i = 1; i < 31; i++) {
//     const options = { day: i };
//     const url = "";
    
//     request(url, function (error, response, body) {
//       if (error) {
//         return console.log(`Произошла ошибка: ${error}`);
//       }
      
//       const $ = cheerio.load(body);
//       let celebrations = [];
      
//       $("[itemtype='http://schema.org/Answer'] span[itemprop='text']").each(function(i) {
//         if (i > 25) {
//           return false;
//         }
        
//         let text = $(this).text();
        
//         if (text.includes("Именины")) {
//           return true;
//         }
        
//         if (text.includes("(")) {
//           const regexp = /\((.*?)\)/;
//           text = text.replace(regexp, "").replace(/ +/g, " ");
//         }
        
//         if (text.includes("-")) {
//           const splitted = text.split("-");
//           text = `${splitted[0].trim()} (${splitted[1].trim()})`;
//         }
        
//         celebrations.push(text);
//       });
      
//       console.log(`${i}: Праздников найдено: ${celebrations.length}`);
      
//       // res.send(celebrations);
//       setCellsData(celebrations, options);
//     });
//   }
});

function setCellsData(data, options) {
  spreadsheet.useServiceAccountAuth(credentials, () => {
    spreadsheet.getInfo(function(err, info) {
      console.log(`Loaded document: ${info.title} by ${info.author.email}`);
      const sheet = info.worksheets[1];
      
      sheet.getCells({
        'min-row': options.day,
        'max-row': options.day,
        'max-col': data.length,
        'return-empty': true
      }, function(err, cells) {
        cells.map((el, i) => {
          cells[i].value = data[i];
        })
        
        console.log(`${cells.length} cells changed`);
        sheet.bulkUpdateCells(cells);
      });
    });
  });
}

module.exports = router;
