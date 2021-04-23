/* eslint-disable @typescript-eslint/require-await */

async function main(event) {
  console.log('databasePort 👉', process.env.databasePort);
  console.log('tableName 👉', process.env.tableName);

  return {body: JSON.stringify({message: 'SUCCESS'}), statusCode: 200};
}

module.exports = {main};
