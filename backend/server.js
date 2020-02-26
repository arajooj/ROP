const express = require('express');

const app = express();

app.listen(8080);



const Instagram = require('instagram-web-api') //incluir a api
const { username, password } = process.env // realmetne nao sei ainda
const client = new Instagram({ username: 'coalitos2', password: 'Mercenaries/1' }) // bot que usa pra consultar

// rota pra conseguir info de usuarios, rota com variavel :name
app.get('/get_user_info/:name', (req, res) => {
    ;(async () => {
        try // testa se não...
        {
            await client.login() // so processegue se o login for concluido
            const user = await client.getUserByUsername({ username: req.params.name } ) // req.params.name e a variavel com o user... 
            res.json(user); // retorna o json
            console.log("/get_user_info/" + req.params.name +" = SUCESSO") //debug
            return 0
        }
        catch(err) { // pega o erro e trata
            if(err.statusCode===404) // se não encontrar o user
            {
                res.send("Usuario não encontrado");
                console.log("/get_user_info/" + req.params.name +" = FALHA") //debug
            }
            //res.send(err);
            return 0
        }
    })()
});

// pegar id do user
app.use('/get_user_info/:name/id', (req, res) => {
    ;(async () => {
        try // testa se não...
        {
            await client.login() // so processegue se o login for concluido
            const user = await client.getUserByUsername({ username: req.params.name } ) // req.params.name e a variavel com o user... 
            res.json(user.id); // retorna o json
            console.log("/get_user_info/" + req.params.name + "/id = SUCESSO") //debug
            return 0
        }
        catch(err) { // pega o erro e trata
            if(err.statusCode===404) // se não encontrar o user
            {
                res.send("Usuario não encontrado");
                console.log("/get_user_info/" + req.params.name + "/id = FALHA") //debug
            }
            //res.send(err);
            return 0
        }
    })()
})


// informaçoes de uma imagem pelo shortcode
app.get('/get_image_info/:shortcode', (req, res) => {
    ;(async () => {

        try // testa se não...
        {
            await client.login() // so processegue se o login for concluido
            const media = await client.getMediaByShortcode({ shortcode: req.params.shortcode }) 
            res.json(media); // retorna o json
            console.log("/get_image_info/" + req.params.shortcode + " = SUCESSO") //debug
            return 0
        }
        catch(err) { // pega o erro e trata
            if(err.statusCode===404) // se não encontrar o user
            {
                res.send("Imagem não encontrada");
                console.log("/get_image_info/" + req.params.shortcode + " = FALHA") //debug
            }
            //res.send(err);
            return 0
        }
    })()
});

// url de uma imagem pelo shortcode
app.get('/get_image_info/:shortcode/url', (req, res) => {
    ;(async () => {

        try // testa se não...
        {
            await client.login() // so processegue se o login for concluido
            const media = await client.getMediaByShortcode({ shortcode: req.params.shortcode }) 
            res.json(media.display_url); // retorna o json
            console.log("/get_image_info/" + req.params.shortcode + "/url = SUCESSO") //debug
            return 0
        }
        catch(err) { // pega o erro e trata
            if(err.statusCode===404) // se não encontrar o user
            {
                res.send("Imagem não encontrada");
                console.log("/get_image_info/" + req.params.shortcode + "/url = FALHA") //debug
            }
            //res.send(err);
            return 0
        }
    })()
});

// seguidores por id
app.get('/get_followers/:id', (req, res) => {
    ;(async () => {

        try // testa se não...
        {
            await client.login() // so processegue se o login for concluido
            const followers = await client.getFollowers({ userId: req.params.id , first: 100})
            res.json(followers); // retorna o json
            console.log("/get_followers/" + req.params.id + " = SUCESSO") //debug
            return 0
        }
        catch(err) { // pega o erro e trata
            if(err.statusCode===404) // se não encontrar o user
            {
                res.send("ID INCORRETO");
                console.log("/get_followers/" + req.params.id + " = FALHA") //debug
            }
            //res.send(err);
            return 0
        }
    })()
});
