const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors({
  origin: ['http://127.0.0.1:5500']
}));

const procedureListUrl = 'https://etp.eltox.ru/registry/procedure';

app.get('/', function (req, res) {
  res.json('This is my web-scraper')
})

app.get('/results', (req, res) => {

  axios(procedureListUrl)
      .then(response => {
        const html = response.data;
        const getProcedureListHtml = cheerio.load(html);
        const procedures = [];

        getProcedureListHtml('.descriptTenderTd', html).each(function () {
                const reId = /\d{4}/;
                const reNumber = /\d{11}/; 

                const procedureRegExIdsArr = getProcedureListHtml(this).find('dt').find('a').text().match(reId);
                const procedureId = procedureRegExIdsArr[0];
                const procedureRegExNumberArr = getProcedureListHtml(this).find('span').text().match(reNumber);
                const procedureNumber = procedureRegExNumberArr[0];
                const procedurePageLink = `https://etp.eltox.ru/procedure/read/${procedureId}`;

                procedures.push({
                  procedureId,
                  procedureNumber,
                  procedurePageLink
                });
            }
        )
        console.log(procedures)
        res.json(procedures)
      }).catch(err => console.error(err.response.status))

})


// setTimeout(() => {
//     axios(procedureListUrl)
//       .then(response => {
//         const html = response.data;
//         const getProcedureListHtml = cheerio.load(html);
//         const procedures = [];

//         getProcedureListHtml('.descriptTenderTd', html).each(function () {
//                 const reId = /\d{4}/;
//                 const reNumber = /\d{11}/; 

//                 const procedureRegExIdsArr = getProcedureListHtml(this).find('dt').find('a').text().match(reId);
//                 const procedureId = procedureRegExIdsArr[0];
//                 const procedureRegExNumberArr = getProcedureListHtml(this).find('span').text().match(reNumber);
//                 const procedureNumber = procedureRegExNumberArr[0];
//                 const procedurePageLink = `https://etp.eltox.ru/procedure/read/${procedureId}`;

//                 procedures.push({
//                   procedureId,
//                   procedureNumber,
//                   procedurePageLink
//                 });
//             }
//         )

//         console.log(procedures);
//       }).catch(err => console.log(err))
//     }, 5000
// )

// procedures.map(procedure => {
    
//   setTimeout(() => {
//     axios(procedure.procedurePageLink)
//       .then(response => {
//         const procedureHtml = response.data;
//         const getProcedureHtml = cheerio.load(procedureHtml);

//         getProcedureHtml('#tab-basic', procedureHtml).each(function() {

//           reEmail = /\S+@[\S.]+/g;
//           const regEmailsArr = getProcedureHtml(this).text().match(reEmail);
//           const procedureEmail = regEmailsArr[0];

//           procedureDetails.push(
//             procedureEmail
//           )

//         })
//         console.log(procedureDetails);
//       }).catch(err => console.log(err))
//     }, 1000
//   )
// })


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));


