const Papa = require("papaparse");
const fs = require("fs");
const request = require("request");

function json() {
    try {
        let csv = fs.readFileSync("data/data.csv", "utf-8")
        let csv_json = Papa.parse(csv, {encoding: "utf-8", header: true})   
        let json = JSON.stringify(csv_json.data);
        fs.unlink("data/data.json", (err) => {
            if (err) {
                throw err;
            }
        
            console.log("Ancien fichier supprimé !");
        });
        fs.appendFile('data/data.json', json, function (err) {   if (err) throw err;   console.log('Nouveau fichier créé !');});
    } catch(e){
        console.error(e);
    }
} 





function download(url, dest, cb) {
    // on créé un stream d'écriture qui nous permettra
    // d'écrire au fur et à mesure que les données sont téléchargées
    const file = fs.createWriteStream(dest);

    // on lance le téléchargement
    const sendReq = request.get(url);

    // on vérifie la validité du code de réponse HTTP
    sendReq.on('response', (response) => {
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }
    });

    // au cas où request rencontre une erreur
    // on efface le fichier partiellement écrit
    // puis on passe l'erreur au callback
    sendReq.on('error', (err) => {
        fs.unlink(dest);
        cb(err.message);
    });

    // écrit directement le fichier téléchargé
    sendReq.pipe(file);

    // lorsque le téléchargement est terminé
    // on appelle le callback
    file.on('finish', () => {
        // close étant asynchrone,
        // le cb est appelé lorsque close a terminé
        file.close(cb);
    });

    // si on rencontre une erreur lors de l'écriture du fichier
    // on efface le fichier puis on passe l'erreur au callback
    file.on('error', (err) => {
        // on efface le fichier sans attendre son effacement
        // on ne vérifie pas non plus les erreur pour l'effacement
        fs.unlink(dest);
        cb(err.message);
    });
};

download('https://docs.google.com/spreadsheets/d/e/2PACX-1vT0syUr5VoKw6isNHmOFuTlwyNIarHN5lR3n9UDyfflMa1sKkzAlqYLHOv-nMCUXWdsjnzvTlLTB2iF/pub?gid=0&single=true&output=csv', 'data/data.csv', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    else {
    console.log('Téléchargement des données terminé !');
    json();
    }
})