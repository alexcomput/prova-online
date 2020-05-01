import acl from 'express-acl';

acl.config({
  filename: 'nacl.json',
  baseUrl: '/',
});

export default acl;
