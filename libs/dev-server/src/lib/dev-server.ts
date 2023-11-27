import { Request, Response } from 'express';
import * as express from 'express';
import { getBody, run } from './helpers';
import * as bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json()); // <==== parse request body as JSON

const port = 6000;

app.post('/run', async (req: Request, res: Response) => {
  try {
    const { command } = getBody<{ command: string }>(req, res);
    const stdout = await run(command);

    res.json(stdout);
  } catch (error) {
    res.sendStatus(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
