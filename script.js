fetch("data/data.json")
.then(response => response.json())
.then(response => main(JSON.stringify(response)))
.catch(error => alert("Erreur : " + error));

async function main(res_json){
    index_part = JSON.parse(res_json);

    
}

function search(value1, value2) {
    response_item = [];
    response_url = [];
    response_best_item = [];
    response_best_url = [];
    value1_ = value1.replace(/ /g,'');
    value1_ = value1_.toLowerCase();
    value2_ = value2.replace(/ /g,'');
    value2_ = value2_.toLowerCase();
    index_part.forEach(function(item, index, array) {
        item_ = item.Nom.replace(/ /g,'');
        item_ = item_.toLowerCase();
        if(item_.includes(value1_)) {
            if(value1_ != ""){
            response_item.push(item.Nom);
            response_url.push(item.URL);
            }
        }
        if(item_.includes(value2_)) {
            if(value2_ != ""){
            response_item.push(item.Nom);
            response_url.push(item.URL);
            }
        }
        if(item_.includes(value1_)) {
            if(item_.includes(value2_)) {
                if(value1_ != ""){
                    if(value2_ != "") {
                    response_best_item.push(item.Nom);
                    response_best_url.push(item.URL);
                    }
                }
            }
        }
        if(item_.includes(value1_)) {
            if(item_.includes(value2_)) {
                if(value2_ != ""){
                    if(value1_ != "") {
                    response_best_item.push(item.Nom);
                    response_best_url.push(item.URL);
                    }
                }
            }
        }
    })
    search_finished(response_item, response_url);
    if(response_best_item[0] != undefined) {
        best_finished(response_best_item, response_best_url);

    }
}
