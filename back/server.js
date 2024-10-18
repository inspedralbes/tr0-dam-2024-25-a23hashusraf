// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process'); 
const app = express();
const port = 27777;

app.use(express.json());
app.use(express.static('public'));

const dataFilePath = path.join(__dirname, 'preguntes.json');

// GET: Obtener todas las preguntas
app.get('/api/preguntes', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading the file');
        }
        res.json(JSON.parse(data));
    });
});

// POST: Recibir respuestas del quiz desde Android
app.post('/api/respostes', (req, res) => {
    const userAnswer = req.body; // Espera un JSON con la respuesta del usuario

    // Archivo donde se guardarán las respuestas del usuario
    const resultatsFilePath = path.join(__dirname, 'resultats.json');

    // Leer el archivo de resultados
    fs.readFile(resultatsFilePath, 'utf8', (err, data) => {
        if (err && err.code === 'ENOENT') {
            // Si el archivo no existe, crear un array vacío
            data = '[]';
        } else if (err) {
            return res.status(500).send('Error reading the results file');
        }

        let resultats = JSON.parse(data);  // Parseamos los resultados existentes

        // Añadir la nueva respuesta del usuario
        resultats.push(userAnswer);

        // Guardar el archivo de resultados actualizado
        fs.writeFile(resultatsFilePath, JSON.stringify(resultats, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving the results');
            }
            res.status(201).send('Respuesta guardada exitosamente');
        });
    });
});

// POST: Agregar una nueva pregunta
app.post('/api/preguntes', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading the file');
        }
        const preguntes = JSON.parse(data);

        // Asignar un nuevo ID único basado en la longitud actual
        const newId = preguntes.length ? preguntes[preguntes.length - 1].id + 1 : 1;

        // Crear un nuevo objeto para la nueva pregunta
        const newQuestion = {
            id: newId, // Asignamos el ID
            pregunta: req.body.pregunta, // Asignamos la pregunta del cuerpo de la solicitud
            imatge: req.body.imatge, // Asignamos la imagen del cuerpo de la solicitud
            resposta_correcta: req.body.resposta_correcta, // Asignamos la respuesta correcta del cuerpo de la solicitud
            respostes: req.body.respostes.map((resposta, index) => ({
                id: index + 1, // Asignamos IDs a las respuestas
                etiqueta: resposta.etiqueta // Asignamos la etiqueta de cada respuesta
            }))
        };

        // Añadir la nueva pregunta al array
        preguntes.push(newQuestion);

        // Guardar el archivo JSON actualizado
        fs.writeFile(dataFilePath, JSON.stringify(preguntes, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving the file');
            }
            res.status(201).json(newQuestion); // Devolver la nueva pregunta añadida
        });
    });
});

// DELETE: Eliminar una pregunta
app.delete('/api/preguntes/:id', (req, res) => {
    const questionId = parseInt(req.params.id);
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading the file');
        }
        let preguntes = JSON.parse(data);
        preguntes = preguntes.filter(pregunta => pregunta.id !== questionId);

        fs.writeFile(dataFilePath, JSON.stringify(preguntes, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving the file');
            }
            res.sendStatus(204); // No content
        });
    });
});

// NUEVA RUTA: POST para enviar respuestas al script de estadísticas en Python
app.post('/api/estadistiques', (req, res) => {
    const respostes = req.body; // Las respuestas llegan en formato JSON

    // Llamar al script Python para calcular las estadísticas
    const python = spawn('python3', ['calcular_estadisticas.py']);

    // Enviar las respuestas al script Python
    python.stdin.write(JSON.stringify(respostes));
    python.stdin.end();

    // Recibir los resultados del script Python
    let dataString = '';
    python.stdout.on('data', (data) => {
        dataString += data.toString();
    });

    python.stdout.on('end', () => {
        // Enviar las estadísticas de vuelta al cliente
        res.json(JSON.parse(dataString));
    });

    python.stderr.on('data', (data) => {
        console.error(`Error en el script Python: ${data}`);
        res.status(500).send('Error al calcular las estadísticas');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running at http://a23hashusraf.dam.inspedralbes.cat:${port}`);
});
