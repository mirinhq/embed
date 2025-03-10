import express from 'express';
import cors from 'cors';
import { Client } from '@mirinhq/admin';

const app = express();

app.use(cors({ origin: true, credentials: true }));

const port = 9000;

const client = new Client({
  privateApiKey: process.env['MIRIN_PRIVATE_API_KEY']!,
});

app.get('/document', async (req, res) => {
  try {
    const data = await client.getDocuments();
    res.json(data.documents);
  } catch (err) {
    console.log('error', err);
  }
});

app.post('/create-document', async (_, res) => {
  const documentRes = await client.createDocument({
    title: 'New Document',
  });

  if (documentRes.type === 'success') {
    res.json(documentRes.data);
    return;
  }

  res.status(500).send({ error: 'Error in creating document' });
});

app.post('/authenticate/:documentId', async (req, res) => {
  const documentId = req.params.documentId;

  const authorizationContext = {
    documentId,
  };

  /**
   * Call the authorize() method which will generate a token to authenticate the user into Mirin's embed editor
   *
   * By default user documents are stored in Mirin, thus pass in the desired `documentId` of the document to load in the editor.
   * You can create a new document by doing client.createDocument() or list all documents by client.getDocuments()
   *
   * Alternatively, if you wish to store/load documents on your own servers, you can specify a custom endpoint: https://docs.mirin.app/embeds/custom-endpoint
   */
  const { token } = await client.authorize(authorizationContext);

  res.json({
    token,
    documentId,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
