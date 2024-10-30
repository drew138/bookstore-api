import { fromEnv } from "@aws-sdk/credential-providers";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();

const getBooks = async (req, res) => {
  if (process.env.NODE_ENV == "production") {
    var client = new DynamoDBClient({
      region: process.env.AWS_REGION,
    });
  } else {
    var client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: fromEnv(),
    });
  }

  const docClient = DynamoDBDocumentClient.from(client);
  const command = new ScanCommand({
    TableName: "tb_books",
  });

  const response = await docClient.send(command);

  const books = [];
  for (var i in response.Items) {
    books.push(response.Items[i]);
  }

  res.contentType = "application/json";
  console.log(books);
  res.json(books);

  return res;
};

const getBooksById = async (req, res) => {
  if (process.env.NODE_ENV == "production") {
    var client = new DynamoDBClient({
      region: process.env.AWS_REGION,
    });
  } else {
    var client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: fromEnv(),
    });
  }

  const docClient = DynamoDBDocumentClient.from(client);

  const command = new GetCommand({
    TableName: "tb_books",
    Key: {
      id: req.params.id,
    },
  });

  const response = await docClient.send(command);
  console.log(response.Item);
  res.json(response.Item);
  return res;
};

const sendBooksEmail = async (req, res) => {
  if (process.env.NODE_ENV == "production") {
    var client = new DynamoDBClient({
      region: process.env.AWS_REGION,
    });
  } else {
    var client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: fromEnv(),
    });
  }

  const docClient = DynamoDBDocumentClient.from(client);
  const command = new ScanCommand({
    TableName: "tb_books",
  });

  const response = await docClient.send(command);

  const books = [];
  for (var i in response.Items) {
    books.push(response.Items[i]);
  }

  let htmlContent = `
        <h1>Book Inventory</h1>
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Image</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Title</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Author</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Description</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Stock</th>
                </tr>
            </thead>
            <tbody>`;

  books.forEach((item) => {
    htmlContent += `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">
                    <img src="${item.image}" alt="${item.name}" width="50" height="75"/>
                </td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.author}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.description}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.price}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.countInStock}</td>
            </tr>`;
  });
  htmlContent += `
            </tbody>
        </table>`;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  email = req.body.email;
  const msg = {
    to: email,
    from: "andresalazar138@gmail.com", // Change to your verified sender
    subject: "Available books",
    text: "Available Books",
    html: htmlContent,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });

  res.contentType = "application/json";
  console.log(books);
  res.json(books);

  return res;
};

export { getBooksById, getBooks, sendBooksEmail };
