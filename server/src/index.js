import dotenv from 'dotenv';
import { createServer } from './server.js';
import { connectDatabase } from './lib/database.js';

dotenv.config();

const port = process.env.PORT || 8080;

await connectDatabase();

const app = createServer();

app.listen(port, () => {
  console.log(`PrintCRM API running on http://localhost:${port}`);
});


pritamdev649_db_user

dsbtAjXPQcCNkaD5