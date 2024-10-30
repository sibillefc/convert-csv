const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function convertJsonToCsv(jsonFilePath, csvFilePath) {
  try {
    // Ler o arquivo JSON
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    const jsonObject = JSON.parse(jsonData);

    // Verifica se o jsonObject é um array

    if (!Array.isArray(jsonObject)) {
      throw new Error('O JSON deve ser um array de objetos.');
    }

    // Pegar as chaves (headers) do primeiro objeto
    const headers = Object.keys(jsonObject[0]).map(key => ({ id: key, title: key }));

    // Criar o escritor de CSV
    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: headers
    });

    // Escrever os dados no arquivo CSV
    await csvWriter.writeRecords(jsonObject);

    console.log(`Arquivo CSV gerado com sucesso em ${csvFilePath}`);
  } catch (err) {
    console.error('Erro ao converter JSON para CSV:', err);
  }
}

const jsonFilePath = 'arquivo/level_b2b.json';
const csvFilePath = 'arquivo/level_b2b.csv';

if (jsonFilePath && csvFilePath) {
  convertJsonToCsv(jsonFilePath, csvFilePath);
} else {
  console.log('Por favor, forneça os caminhos dos arquivos JSON e CSV. Obrigado!');
}
