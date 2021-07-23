//appel du DOM
document.addEventListener('DOMContentLoaded',()=>{
    const articles = document.querySelector('#article');
    const articleForm = document.querySelector('#ajouter-article-form');
    articleForm.addEventListener('submit', ajouterArticle);
  
    fetch(' http://localhost:3000/articles',{
        method:"GET",
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type':'application/json'
        }
    })
        .then(response=>response.json())
        .then(articles=>articles.forEach(afficherArticle))
        function afficherArticle(article) {
        const articleDIV= document.createElement('div');
        articleDIV.dataset.id= article.id
        articleDIV.id = "card-article" + article.id;
        articleDIV.className='card '
        articleDIV.innerHTML =
        
        `
        <div class="col-xs3 col-md3 row-sm4  ">
        <div class="card  shadow-1 hoverable-1 rounded-3 bd-blue bd-r-solid bd-l-solid bd-3 txt-center "  >
            <div class="card-image">
                <img src="${article.articleImage}" class="container-field" alt="logo"  />
            </div>
            <div class="card-header">${article.title}</div>
            <div class="divider"></div>
            <div class="card-content" >
            ${article.articleDescription}
            </div>
            <div class="divider"></div>
            <div class="card-content txt-center">Prix: ${article.articlePrix} €</div>
            <div class="divider"></div>
            
            </div>
</div>
        `
            articles.appendChild(articleDIV)
            const btnDelete = document.createElement("Button");
    btnDelete.setAttribute("id",`btnDelete${article.id}`);
    btnDelete.innerHTML = `supprimer: ${article.title}`;
    btnDelete.className = "btn error rounded-1 small col xs4";
    articleDIV.appendChild(btnDelete);
    btnDelete.addEventListener('click', () => deleteArticle(article));
    function deleteArticle(article) {
        const cardArticle = document.querySelector(`#card-article${article.id}`)
        console.log(cardArticle);
        return fetch(` http://localhost:3000/articles/${article.id}`, {
            method:'Delete'
        })
        .then(response => response.json())
        .then(() => {
            cardArticle.remove()
        })
            }
           /********************************Detail**********************************/
    const btnDetails = document.createElement('button');
    btnDetails.setAttribute("id", `${article.id}`);
    btnDetails.innerHTML = 'Details:' + article.title;
    btnDetails.className = "btn rounded-1 small primary press mt-2 col xs4" ;
    articleDIV.appendChild(btnDetails);
    btnDetails.addEventListener('click', () => detailsarticle(article));
    
    /************fonction details************************/
    function detailsarticle(article) {
        const cardArticle = document.querySelector(`#card-article${article.id}`);
        return fetch(` http://localhost:3000/articles/${article.id}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(article=>afficherDetailsArticle(article))
    }
    function afficherDetailsArticle(article) {
        const detailsContainer = document.querySelector("#detailsarticle");

        articles.animate([
            { transform: "translateX(0px)" },
            { transform: "translateY(-300px)" }
        ], {
            duration: 200,
        });
        setTimeout(() => {
            articles.style.display = "none"
        }, 200)
        detailsContainer.innerHTML = `
        <div class="col-xs3 col-md3 row-sm4 ">
        <div class="card shadow-1 hoverable-1 rounded-3 bd-blue bd-r-solid bd-l-solid bd-3 txt-center "  >
            <div class="card-image">
                <img src="${article.articleImage}" class="container-field" alt="logo"  />
            </div>
            <div class="card-header">${article.title}</div>
            <div class="divider"></div>
            <div class="card-content" >
            ${article.articleDescription}
            </div>
            <div class="divider"></div>
            <div class="card-content txt-center">Prix: ${article.articlePrix} €</div>
            <div class="divider"></div>
            <div class="card-footer"><a href="http://localhost/json/" class="btn btn-primary shadow-1 rounded-1">retour</a></div>
            </div>
</div>

`

            }
            




/**********************************MISE A JOUR***********************************/
        // bouton mettre a jour 
        const btnUpdate = document.createElement('button');
        //Ajout d'un id unique a chaque bouton
        btnUpdate.setAttribute('id', `btnUpdate${article.id}`)
        // bouton
        btnUpdate.innerHTML = 'Mise a jour:' + article.title;
        //Axentix
        btnUpdate.className = "btn rounded-1 small airforce dark-2 press mt-2 col xs4";
        //Ajout du bouton 
        articleDIV.appendChild(btnUpdate);
        //click declenche une fonction
        btnUpdate.addEventListener('click', () => editArticle(article))

    }



    /**************************************************ajout*************************************************************/
   
      function donneeFormulaires() {
       // event.preventDefault();
        return {
            title: `${event.currentTarget.title.value}`,
            articleDescription: `${event.currentTarget.articleDescription.value}`,
            articleImage: `${event.currentTarget.articleImage.value}`,
            articlePrix: `${event.currentTarget.articlePrix.value}`,
        }
    }

    
    function ajouterArticle(event) {
        event.preventDefault();
        let newArticle = donneeFormulaires(event);
        //console.log(newArticle);
        event.preventDefault();
        return fetch(' http://localhost:3000/articles', {
            method: 'POST',
            headers: {
                'Access-control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newArticle)
           
        })
            .then(response => response.json())
            .then(article => afficherArticle(article))
            
    }
    
       
   

         /*********************************FONCTION MISE A JOUR************************************/
         function editArticle(article){
             //Fomulaire ajouter 
             const ajouterForm = document.getElementById("ajouter-article-form");
             //style
             ajouterForm.animate([
                 {opacity: 1},
                 {opacity: 0}
             ],{
                 duration:500,
             });
            
             setTimeout(() =>{
                 ajouterForm.style.display = "none"
             }, 500);

             //Le formulaire d'edition
             const editForm = document.createElement('form');
             editForm.id = "edit-form";
             //Ajout html  formulaire  
             editForm.innerHTML = `
             <h3 class="txt error">Editer un article</h3>
             <form id="ajouter-article-form">
             <div class="form-field">
               <label>Nom articles</label>
               <input class="form-control" value="${article.title}" type="text" name="title">
             </div>
       
             <div class="form-field">
               <label>Description articles</label>
               <input class="form-control" value="${article.articleDescription}" type="text" name="articleDescription">
             </div>
       
             <div class="form-field">
               <label>Prix articles</label>
               <input class="form-control" value="${article.articlePrix}" type="text" name="articlePrix">
             </div>
       
             <div class="form-field">
               <label>Image  articles</label>
              <!-- <input type="file" id="fileUpload" name="articleImage"/>-->
               <input class="form-control" value="${article.articleImage}" type="text" name="articleImage" id="image">
             </div>
       
             <div class="form-field txt-center">
                 <button class="btn shadow-1 rounded-1 outline opening txt-blue " value="MISE A JOUR" type="submit"><span class="outline-text">Valider</span></button>
              <!--<input class="btn btn-outline-info" value="Mise a jour" type="submit">-->
             </div>
           </form>
             `
             //Le formulaire d'edition )
            updateForm.appendChild(editForm);
             //fonction a la soumission du formulaire
             editForm.addEventListener('submit', (event) => updateArticle(event, article))
         }

         // nouvelles données
         function updateArticle(event, article){
             //Supprime le comportement par defaut
            event.preventDefault();
            //Recup des valeur du formulaire
            let updatedArticle = donneeFormulaires();
            //Test de debug
            console.log(updatedArticle, article.id);
           
            fetch(`http://localhost:3000/articles/${article.id}`,{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(updatedArticle)
            })
                //Prommesse + format json
                .then(response => response.json())
                .then(function (){
                    //Debug + refresh de la page + afficher le produit modifier
                    console.log('Votre mise a jour a ete pris en compte')
                    window.location.reload()
                    afficherArticle(article)
                })

         }

  
   
})

 