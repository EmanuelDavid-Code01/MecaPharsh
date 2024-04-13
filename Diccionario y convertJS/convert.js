const fs = require('fs');
const path = require('path');

// Leer el archivo asincrónicamente
async function asyncReadFile(filename) {
    try {
        const contents = await fs.promises.readFile(filename, 'utf-8');
        const arr = contents.split(/\r?\n/);
        return arr;
    } catch (err) {
        console.log(err);
        return [];
    }
}

// Escribir un array en un archivo
async function asyncArrayToFile(filename, content) {
    try {
        const data = 'const dictionary = ' + JSON.stringify(content) + ';\n\nmodule.exports = dictionary;';
        const filePath = path.resolve(__dirname, filename); // Ruta absoluta del archivo
        await fs.promises.writeFile(filePath, data);
        console.log(`El archivo ${filename} se ha creado exitosamente en ${filePath}.`);
    } catch (err) {
        console.log(err);
    }
}

// Llamar a la función para leer el archivo y luego escribir el archivo .js
asyncReadFile('Diccionario.txt').then((Diccionario) => {
    asyncArrayToFile('Diccionario.js', Diccionario);
});

// Exportar la función para poder usarla desde otro script
module.exports = {
    asyncReadFile,
    asyncArrayToFile
};
