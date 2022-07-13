const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const url = 'https://etp.eltox.ru/registry/procedure';

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    let procedures = [];

    $('.descriptTenderTd', html).each(function() {
      const reId = /\d{4}/;
      const reNumber = /\d{11}/;

      const procedureRegExArr = $(this).find('dt').find('a').text().match(reId);
      const procedureId = procedureRegExArr[0];
      const procedureRegExNumberArr = $(this).find('span').text().match(reNumber);
      const procedureNumber = procedureRegExNumberArr[0];
      const procedurePageLink = `https://etp.eltox.ru/procedure/read/${procedureId}`

      procedures.push({
        procedureId,
        procedureNumber,
        procedurePageLink
      });
    })

    console.log(procedures);
  }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
