import fs from 'fs'

export async function writeJsonFile(jsonObject, path = 'utils/data.json') {
  const updatedJsonString = JSON.stringify(jsonObject, null, 2)
  await fs.promises.writeFile(path, updatedJsonString, 'utf-8')
}

export async function readJsonFile(path = 'utils/data.json') {
  const fileContent = await fs.promises
    .readFile(path, 'utf-8');
  if (fileContent) {
    const jsonObject = JSON.parse(fileContent)
    return jsonObject;
  }
}

export async function generateString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
export async function generateNumber(length) {
  const characters =
    "0123456789";

  let result = "2547";
  const charactersLength = characters.length
  for (let i = 0; i < length - 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}