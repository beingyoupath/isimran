import https from 'https';

const ids = [
  '1gmpGHtsb2iJ0tP-_yuMI-PnArP-KnZV2',
  '1iTW_XmU7hqQSNtJIKRC3ApQjW2yyZnne',
  '13oT9VPQursUn3OmZPH2zdzO3Z5vm9VnM'
];

ids.forEach(id => {
  https.get(`https://drive.google.com/uc?export=view&id=${id}`, (res) => {
    console.log(id, res.headers['content-disposition']);
  });
});
