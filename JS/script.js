const $ = (elem) => document.querySelector(elem)
const $$ = (elem) => document.querySelectorAll(elem)



window.addEventListener("load", (e) => {

    // -----  VARIABLES  -----

    

    // -- BTN Light --

    const $btnMoodLight = $("#btnMoodLight");
    const $body = $("body");
    const $resultBox = $(".resultBox")

    // -- Inputs
    const $search = $("#search");
    const $selectType = $("#selectType");
    const $optionCharacters = $(".optionCharacters");
    const $optionLocations = $(".optionLocations");
    const $selectOrder = $("#selectOrder");


    let nameSearchCharacters = ``;
    let statusCharacter = "";
    let locationCharacters = "";
    let searchNameEpisode = "";

    let valueType, valueStatus, valueLocations , valueOrder, valuesearch

    // -- Section Errors--
    const $errors = $(".errors");

    
    // --  Section Season --
    const $seasonBox = $(".seasonBox");
    const $sectionIndividualSeason = $(".sectionIndividualSeason")
    const $season1 = $("#season1");
    const $season2 = $("#season2");
    const $season3 = $("#season3");
    const $season4 = $("#season4");
    const $season5 = $("#season5");
    const $season6 = $("#season6");
    const $season1Pages = $(".season1Pages")
    const $season2Pages = $(".season2Pages")
    const $season3Pages = $(".season3Pages")
    const $season4Pages = $(".season4Pages")
    const $season5Pages = $(".season5Pages")
    const $season6Pages = $(".season6Pages")
    const $numPageEpisodes = $("#numPageEpisodes")
    const $modalCharactersEpisodes = $(".modalCharactersEpisodes")
    const $paintModalCharactersEpisodes = $(".paint-modalCharactersEpisodes")
    const $btnCloseEpisodesCh = $(".btnCloseEpisodesCh")


    let pagesEpisode = 1
    let episode = ""


    // -- Section Character --

    let page = 1
    const $containerInfoCharacter = $(".containerInfoCharacter");
    const $characterBox = $("#characterBox");
    const $searchResult = $("#searchResult");



    // -- Modal Individual character --

    const $btnCloseModalCharacter = $(".btn_closeModalCharacter");
    const $modalCharacter = $(".modalCharacter")
    // -- BTN Pages --

    const $firstPage = $("#first-page");
    const $previousPage = $("#previous-page");
    const $numPage = $("#numPage");
    const $countPages = $("#countPages");
    const $nextPage = $("#next-page");
    const $lastPage = $("#last-page");

    let totalPages = 0



    // --MODAL Individual Character --
    const $episodeViewCharacter = $(".episode-viewCharacter");
    const $viewCharacter = $("#viewCharacter");



    // --- SECTION LOCATIONS  ---
    const $containerLocation = $(".containerLocation")
    const $sectionLocations = $(".sectionLocations")
    const $errorsLocation = $(".errorsLocation");
    let searchLocation = "";
    let pagesLocation = "";
    let location = "";
    
    let numInitLocation = 0
    let numFinalLocation = numInitLocation + 9
    let elementResto = 0

   //  --Modal Locations characters--
   const $modalCharactersLocation = $(".modalCharactersLocation");
   const $paintModalCharactersLocation = $(".paint-modalCharactersLocation");
   const $btnCloseLocationCh = $(".btnCloseLocationCh")


   // --Location pages--
   const $firstPageLocation = $("#first-pageLocation");
   const $previousPageLocation = $("#previous-pageLocation");
   const $numPageLocation = $("#numPageLocation");
   const $nextPageLocation = $("#next-pageLocation");
   const $lastPageLocation = $("#last-pageLocation");
  
   let numPagesLocations = 1;
   let totalElementsLocation 


// ---  FUNCTIONS   ---- 

   // -- Generals --
     $numPageLocation.value = numPagesLocations;

     const sortAZ = (array) => {
       return  array.sort((a,b) => {
             if(a.name > b.name){
              return 1
             }
             if(a.name < b.name){
              return -1
             }
             return 0;
          })
     }
     
     const sortZA = (array) => {
         return  array.sort((a,b) => {
               if(a.name < b.name){
                return 1
               }
               if(a.name > b.name){
                return -1
               }
               return 0;
            })
       }


//    -----SECTION CHARACTERS ----

const pagination = (data) => {
    $numPage.value = page;
    $countPages.innerText = "";
    $countPages.innerText = ` de ${data}`;

 }

 const paintIndividualCharacter = async (num) => {
    try{
       const response = await fetch(`https://rickandmortyapi.com/api/character/${num}`)
       const data = await response.json()
       $viewCharacter.innerHTML = "";
       $viewCharacter.innerHTML = `
          <div>
           <img class="img-viewCharacter" src="${data.image}" alt="Imagen de ${data.name}"/>
          </div>
          <div class="infoBox-viewCharacter">
               <h3>${data.name}</h3>
               <div class="itemsCharacters">
               <h6>Estado:</h6>
               <p>${data.status}</p>
               </div>
               <div class="itemsCharacters">
               <h6>Especie:</h6>
               <p>${data.species}</p>
               </div>
               <div class="itemsCharacters">
               <h6>Tipo:</h6>
               <p>${data.type !== "" ? data.type : "-" }</p>
               </div>
               <div class="itemsCharacters">
               <h6>Genero:</h6>
               <p>${data.gender}</p>
               </div>
               <div class="itemsCharacters">
               <h6>Origen:</h6>
               <p>${data.origin.name}</p>
               </div>
               <div class="itemsCharacters">
               <h6>Creado:</h6>
               <p>${Date(data.create)}</p>
               </div>
          </div>
       `;
    } catch (error) {
       $viewCharacter.innerHTML = `
       <section class="errors">
          <i class="fa-solid fa-circle-exclamation"></i>
          <p>No se pudo cargar el contenido!<br> Intente cargar la pagina nuevamente</p>
         </section>
       `
    }

  }

  const paintCharacters = (data, box) => {
    box.innerHTML = "";
    data.forEach(character => {
       box.innerHTML += `
       <div class="cardCharacter" id="${character.id}">
             <div class="characterImg">
               <img src="${character.image}" alt="Imagen de ${character.name}" />
             </div>
             <h5>${character.name}</h5>
           </div>
       `
    })
    const $$cardCharacter = $$(".cardCharacter")
    $$cardCharacter.forEach(box => box.addEventListener("click", (e) => {
       console.log(box.id)
       $modalCharacter.classList.remove("display");
       paintIndividualCharacter(box.id)
    }))
   }

  const loadDataCharacters = async(url) => {
    try{
       const response = await fetch(`${url}?page=${page}${nameSearchCharacters}${statusCharacter}${locationCharacters}`)
       const data = await response.json()
       paintCharacters(data.results, $characterBox);
       $searchResult.innerText = "";
       $searchResult.innerText = data.info.count;
       totalPages = data.info.pages
       pagination(totalPages);
       $errors.classList.add("display");
    } catch (error) {
       $errors.classList.remove("display")
    }

   }


 const loadNextPage =() => {
    if(page + 1 <= totalPages ){
    page = page + 1
    loadDataCharacters("https://rickandmortyapi.com/api/character/");
    }}

 const loadLastPage = () => {
    if(page !== totalPages){
       page = totalPages;
       loadDataCharacters("https://rickandmortyapi.com/api/character/");
    }
    }

 const loadPreviousPage = () => {
    if(page - 1 > 0 ){
       page = page - 1
       loadDataCharacters("https://rickandmortyapi.com/api/character/");
       }
    }

 const loadfirstpage = () => {
    if(page !== 1){
    page = 1;
    loadDataCharacters("https://rickandmortyapi.com/api/character/");
    }
 }

 const electionPageCharacters = () => {
    if($numPage.value > 0 && $numPage.value <= totalPages  ){
       page = $numPage.value
       loadDataCharacters("https://rickandmortyapi.com/api/character/");
       }
    }



    

// -- Input --

const valueInputs = () => {
    valuesearch = $search.value
    valueType = $selectType.value
    valueStatus = $optionCharacters.value
    valueLocations = $optionLocations.value
    valueOrder = $selectOrder.value
 }
 
 
 
 
 const inputSelectType = (value) => {
     if(value === "characters"){
        $resultBox.classList.remove("display");
        $optionCharacters.classList.remove("display");
        $optionLocations.classList.add("display");
        $containerInfoCharacter.classList.remove("display");
        $seasonBox.classList.add("display");
        $sectionIndividualSeason.classList.add("display");
        $containerLocation.classList.add("display");
        $selectOrder.setAttribute("disabled","")
        $search.removeAttribute("disabled");
 
     } else if(value === "locations") {
        $resultBox.classList.add("display");
        $containerInfoCharacter.classList.add("display");
        $optionCharacters.classList.add("display");
        $optionLocations.classList.remove("display");
        $sectionIndividualSeason.classList.add("display");
        $containerLocation.classList.remove("display");
        $seasonBox.classList.add("display");
        $selectOrder.removeAttribute("disabled");
        $search.setAttribute("disabled","")
     } else{
       $resultBox.classList.add("display");
        $optionCharacters.classList.add("display");
        $optionLocations.classList.add("display");
        $containerInfoCharacter.classList.add("display");
        $seasonBox.classList.remove("display");
        $sectionIndividualSeason.classList.add("display");
        $containerLocation.classList.add("display");
        $search.setAttribute("disabled","")
     }
 }
 
 
 const charactersStatus = (value) => {
 
  if(value === "all") {
    statusCharacter = "";
    loadDataCharacters("https://rickandmortyapi.com/api/character/");
  } else {
    statusCharacter = `&status=${value}`;
    loadDataCharacters("https://rickandmortyapi.com/api/character/");
  }
 
 }
 
 const characterLocation = (value) => {
    if(value === "all") {
       locationCharacters = "";
       loadDataCharacters("https://rickandmortyapi.com/api/character/");
     } else {
       locationCharacters = `&status=${value}`;
       loadDataCharacters("https://rickandmortyapi.com/api/character/");
     }
 }



 const desingEpisode = (episode) => {
    return episode.slice(0,3)
  }
 
 const paintEpisodes = (elem) => {
    if(desingEpisode(elem.episode) === "S01"){
       $season1.innerHTML += `
           <tr>
               <td>${elem.name}</td>
               <td>${elem.air_date}</td>
               <td>${elem.created}</td>
               <td>${elem.episode}</td>
               <td class="view viewEpisode" id="${elem.id}">Ver +</td>
           </tr>
       `}
    if(desingEpisode(elem.episode) === "S02"){
       $season2.innerHTML += `
           <tr>
               <td>${elem.name}</td>
               <td>${elem.air_date}</td>
               <td>${elem.created}</td>
               <td>${elem.episode}</td>
               <td class="view viewEpisode" id="${elem.id}">Ver +</td>
           </tr>
       `}
    if(desingEpisode(elem.episode) === "S03"){
       $season3.innerHTML += `
           <tr>
               <td>${elem.name}</td>
               <td>${elem.air_date}</td>
               <td>${elem.created}</td>
               <td>${elem.episode}</td>
               <td class="view viewEpisode" id="${elem.id}">Ver +</td>
           </tr>
       `}
    if(desingEpisode(elem.episode) === "S04"){
           $season4.innerHTML += `
               <tr>
                   <td>${elem.name}</td>
                   <td>${elem.air_date}</td>
                   <td>${elem.created}</td>
                   <td>${elem.episode}</td>
                   <td class="view viewEpisode" id="${elem.id}">Ver +</td>
               </tr>
           `}
    if(desingEpisode(elem.episode) === "S05"){
       $season5.innerHTML += `
          <tr>
                <td>${elem.name}</td>
                <td>${elem.air_date}</td>
                <td>${elem.created}</td>
                <td>${elem.episode}</td>
                <td class="view viewEpisode" id="${elem.id}">Ver +</td>
          </tr>
       `}
    if(desingEpisode(elem.episode) === "S06"){
          $season6.innerHTML += `
                <tr>
                   <td>${elem.name}</td>
                   <td>${elem.air_date}</td>
                   <td>${elem.created}</td>
                   <td>${elem.episode}</td>
                   <td class="view viewEpisode" id="${elem.id}">Ver +</td>
                </tr>
          `}
 
 }
 
 let arrayEpisodes = []
 
 const loadDataCharactersEpisode = async() => {
    try{
       const respose = await fetch(`https://rickandmortyapi.com/api/episode/${episode}`)
       const data = await respose.json()
      
       const arrayFetch = data.characters.map(character => fetch(character))
       
       const promeseAll = await Promise.all(arrayFetch)
       
       const info = await Promise.all(promeseAll.map(character =>character.json()))
       
       paintCharacters(info, $paintModalCharactersEpisodes);
 
    }
    catch(error){
 
    }
 }
 
 const loadDataEpisodes = async() => {
    try{
       const response = await fetch(`https://rickandmortyapi.com/api/episode/${searchNameEpisode}`)
       const data = await response.json()
 
       for(i = 1 ;i <= data.info.pages ; i++){
          arrayEpisodes.push(fetch(`https://rickandmortyapi.com/api/episode?page=${i}`))
       }
 
       const info = await Promise.all(arrayEpisodes)
       const dataArray = await Promise.all(info.map(ep => ep.json()))
 
       dataArray.forEach( page => {
          for(const elem of page.results) {
             paintEpisodes(elem)
             }})
 
       const $$viewEpisode = $$(".viewEpisode");
 
       $$viewEpisode.forEach(elem => elem.addEventListener("click", (e) => {
          episode = elem.id
          loadDataCharactersEpisode()
          $modalCharactersEpisodes.classList.remove("display")
          } ))
 
       } catch (error) {
                   $errors.classList.remove("display")
       }
 
   }
 
 
 const episodePagesClassList = () => {
    if(pagesEpisode === 1){
       $season1Pages.classList.remove("display");
       $season2Pages.classList.add("display");
       $season3Pages.classList.add("display");
       $season4Pages.classList.add("display");
       $season5Pages.classList.add("display");
       $season6Pages.classList.add("display");
    }
    if(pagesEpisode === 2){
       $season1Pages.classList.add("display");
       $season2Pages.classList.remove("display");
       $season3Pages.classList.add("display");
       $season4Pages.classList.add("display");
       $season5Pages.classList.add("display");
       $season6Pages.classList.add("display");
    }
    if(pagesEpisode === 3){
       $season1Pages.classList.add("display");
       $season2Pages.classList.add("display");
       $season3Pages.classList.remove("display");
       $season4Pages.classList.add("display");
       $season5Pages.classList.add("display");
       $season6Pages.classList.add("display");
    }
    if(pagesEpisode === 4){
       $season1Pages.classList.add("display");
       $season2Pages.classList.add("display");
       $season3Pages.classList.add("display");
       $season4Pages.classList.remove("display");
       $season5Pages.classList.add("display");
       $season6Pages.classList.add("display");
    }
    if(pagesEpisode === 5){
       $season1Pages.classList.add("display");
       $season2Pages.classList.add("display");
       $season3Pages.classList.add("display");
       $season4Pages.classList.add("display");
       $season5Pages.classList.remove("display");
       $season6Pages.classList.add("display");
    }
    if(pagesEpisode === 6){
       $season1Pages.classList.add("display");
       $season2Pages.classList.add("display");
       $season3Pages.classList.add("display");
       $season4Pages.classList.add("display");
       $season5Pages.classList.add("display");
       $season6Pages.classList.remove("display");
    }
    $numPageEpisodes.value = pagesEpisode;
 }
 
 const selecCardSeason = (page) => {
    $seasonBox.classList.add("display");
    $sectionIndividualSeason.classList.remove("display");
    pagesEpisode = page
    episodePagesClassList();
 }
 
   const loadNextPageEpisodes =() => {
    if(pagesEpisode + 1 <= 6 ){
       pagesEpisode = pagesEpisode + 1;
      episodePagesClassList()
    }}
 
 const loadLastPageEpisodes = () => {
    if(pagesEpisode !== 6){
     pagesEpisode = 6
     episodePagesClassList()
    }
    }
 
 
 const loadPreviousPageEpisodes = () => {
    if(pagesEpisode - 1 > 0 ){
       pagesEpisode = pagesEpisode - 1;
      episodePagesClassList()
    }
    }
 
 const loadfirstpageEpisodes = () => {
    if(pagesEpisode !== 1){
    pagesEpisode = 1;
    episodePagesClassList();
    }
 }
 
 const paginationEpisodes = () => {
    pagesEpisode = Number($numPageEpisodes.value);
 
    episodePagesClassList();
 }
 
 const searchInput = (valueSerch, valueType) => {
 
    if(valueType === "characters"){
       nameSearchCharacters = `&name=${valueSerch}`;
       loadDataCharacters("https://rickandmortyapi.com/api/character/") ;
 
    }
    if(valueType === "episode"){
       searchNameEpisode = `&name=${valueSerch}`
       loadDataCharactersEpisode()
    }
 
  }
 
 
  
//  ---    SECTION LOCATIONS     ---


let arrayLocation = []

const addOptionSelectLocation = (elem) => {
   $optionLocations.innerHTML += `
         <option value="${elem.url}">${elem.name}</option>
         `
}

const paintCardLocation = (elem) => {
   $sectionLocations.innerHTML += `
         <div class="cardLocation">
          <div>
          <h3>${elem.name}</h3>
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Dimensión</th>
                <th>Creado</th>
                <th>Residentes</th>
              </tr>
          </thead>

         <tbody>
         <tr>
         <td>${elem.type}</td>
         <td>${elem.dimension}</td>
         <td>${elem.created}</td>
         <td class="view viewLocation" id="location${elem.id}">Ver +</td>
          </tr>
             
         </tbody>
        </table>
        </div>

        </div>
         `
}



const loadDataCharactersLocation = async() => {
   try{
      const respose = await fetch(`https://rickandmortyapi.com/api/location/${location}`)
      const data = await respose.json()
      
      const arrayFetch = data.residents.map(character => fetch(character))
      
      const promeseAll = await Promise.all(arrayFetch)
      
      const info = await Promise.all(promeseAll.map(character =>character.json()))
      
      paintCharacters(info, $paintModalCharactersLocation);

   }
   catch(error){

   }
}


 const paintPages = (totalElements, array) => {
   totalElementsLocation = totalElements
   elementResto = totalElementsLocation  % 10;

    for(i = `${numInitLocation}`; i <= `${numFinalLocation}` ; i++){
       paintCardLocation(array[i])
      }
    }
    
  
 const numerationPageLocation = () => {

   if(numInitLocation.toString().length === 2 || numInitLocation.toString().length === 1){
     numPagesLocations = Number(numInitLocation.toString().slice(0,1)) + 1
    
   } else {
      numPagesLocations = Number(numInitLocation.toString().slice(0,2)) + 1
     
   }
   $numPageLocation.value = numPagesLocations
 }





 const firstPageLocation = () =>{
   numInitLocation = 0
   numFinalLocation = numInitLocation + 9
   loadDataLocations("https://rickandmortyapi.com/api/location/")
   numerationPageLocation()
 }

 const lastPageLocation = () => {
   numInitLocation = totalElementsLocation -1 - elementResto
   numFinalLocation = totalElementsLocation -1
   loadDataLocations("https://rickandmortyapi.com/api/location/")
   numerationPageLocation()
 }

 const nextPageLocation = () => {
  
   if(numFinalLocation === totalElementsLocation - 1 - elementResto){
      numInitLocation = numInitLocation + 10;
      numFinalLocation = numFinalLocation + elementResto;
      loadDataLocations("https://rickandmortyapi.com/api/location/")
    } else if(numFinalLocation < totalElementsLocation - elementResto - 1){ 
      numInitLocation = numInitLocation + 10;
      numFinalLocation = numFinalLocation + 10;
      loadDataLocations("https://rickandmortyapi.com/api/location/")
    } 
    numerationPageLocation()
    
 }

 const previousPageLocation = () => {
   
   if(numFinalLocation === totalElementsLocation - 1){ 
         numInitLocation = numInitLocation - 10;
         numFinalLocation = numFinalLocation - 6;
         loadDataLocations("https://rickandmortyapi.com/api/location/")
       } else if(numInitLocation > 0){
         numInitLocation = numInitLocation - 10;
         numFinalLocation = numFinalLocation - 10;
         loadDataLocations("https://rickandmortyapi.com/api/location/")
       }
       
       numerationPageLocation()
   
 }

 let arrayOrder = []
 const optionPaintLocation = (value, array) => {
   
   if(value === "z-a"){
      arrayOrder = sortZA(array)
   } else{
      arrayOrder = sortAZ(array)
   }
  
   return arrayOrder
 } 




let locationsInfo = [] 
let countLocations
const loadDataLocations = async(url) => {
   // try{
      $errorsLocation.classList.add("display");
      locationsInfo = [] 
      arrayLocation = []
      try{
         const response = await fetch(`${url}${pagesLocation}${searchLocation}`)
         const data = await response.json()

         countLocations = data.info.count
         

         for(i = 1 ;i <= data.info.pages ; i++){
            arrayLocation.push(fetch(`https://rickandmortyapi.com/api/location?page=${i}`))
         }
         
         const info = await Promise.all(arrayLocation)
         const dataArray = await Promise.all(info.map(location => location.json()))
     
         

         $optionLocations.innerHTML = `<option value="all">Todos</option>`
         $sectionLocations.innerHTML = "",
        
         dataArray.forEach( page => {
            for(const elem of page.results) {
               addOptionSelectLocation(elem);
               locationsInfo.push(elem)
               // paintPages(data.info.count, elem);
               }})
               
         paintPages(data.info.count, optionPaintLocation(valueOrder, locationsInfo))

         

         const $$viewLocation = $$(".viewLocation");
   
         $$viewLocation.forEach(elem => elem.addEventListener("click", (e) => {
            location = elem.id.slice(8,11)
            loadDataCharactersLocation()
            $modalCharactersLocation.classList.remove("display")
            }))

         } catch (error) {
            $errorsLocation.classList.remove("display");
         }
}


const inputPaginationLocations = (value) => {
 
   let totalCountPages = Math.ceil((countLocations -1) / 10)
  
       if( value === 1){
         numInitLocation = 0
         numFinalLocation = 9
         loadDataLocations("https://rickandmortyapi.com/api/location/")
       }
      if(value !== 1 && value !== totalCountPages){
         numInitLocation = Number(`${value - 1}${+ 0}`)
         numFinalLocation = Number(`${value - 1}${+ 0}`) + 9
         loadDataLocations("https://rickandmortyapi.com/api/location/")
      }
      if(value === totalCountPages){
         numInitLocation = Number(`${value - 1}${+ 0}`);
         numFinalLocation = countLocations -1;
         loadDataLocations("https://rickandmortyapi.com/api/location/")
      }
     
 }


   const searchLocations = async () => {
      valueInputs()
      if(valueLocations !== "all" ){ 
      try{
         const response = await fetch(`${valueLocations}`)
         const data = await response.json()
         $sectionLocations.innerHTML = "",
         paintCardLocation(data);
         $errorsLocation.classList.add("display");

      } catch (error) {
         $errorsLocation.classList.remove("display");
      }
     } else {
      loadDataLocations("https://rickandmortyapi.com/api/location/")
     }

      
   }

   // -----  EVENTOS  -----

    // -- BTN Mood Light --

    $btnMoodLight.addEventListener("click", (e) => {
        $btnMoodLight.classList.toggle("active");
        $body.classList.toggle("moodLight")
    })

    // -- Inputs
    $search.addEventListener("change", (e) => {
        valueInputs();
        searchInput(valuesearch, valueType);
    })
    $selectType.addEventListener("change", (e) => {
        valueInputs();
        inputSelectType(valueType);
    })

    $optionCharacters.addEventListener("change", (e) => {
      valueInputs();
      charactersStatus(valueStatus);
    })

    $selectOrder.addEventListener("change", (e) => {
        valueInputs();
        loadDataLocations("https://rickandmortyapi.com/api/location/");
    })
    
    $optionLocations.addEventListener("change", (e) => {
      searchLocations(valueOrder);
  })

    // -- Modal

    $btnCloseModalCharacter.addEventListener("click", (e) => {
      $modalCharacter.classList.add("display");
    })

    $btnCloseEpisodesCh.addEventListener("click", (e) => {
      $modalCharactersEpisodes.classList.add("display");
    })

    $btnCloseLocationCh.addEventListener("click", (e) => {
      $modalCharactersLocation.classList.add("display");
    })

    // -- BTN Pages Characters --

    $nextPage.addEventListener("click", (e) => {
        loadNextPage();

    })

    $lastPage.addEventListener("click", (e) => {
        loadLastPage()
    })

    $previousPage.addEventListener("click", (e) => {
        loadPreviousPage()
    })

    $firstPage.addEventListener("click", (e) => {
      loadfirstpage()
    })

    $numPage.addEventListener("change", (e) => {
      electionPageCharacters()
    })

    // -- SECTION EPIDODES

    $(".cardSeason1").addEventListener("click", (e) => {
      selecCardSeason(1)
    });

    $(".cardSeason2").addEventListener("click", (e) => {
      selecCardSeason(2)
    });

    $(".cardSeason3").addEventListener("click", (e) => {
      selecCardSeason(3)
    });

    $(".cardSeason4").addEventListener("click", (e) => {
      selecCardSeason(4)
    });

    $(".cardSeason5").addEventListener("click", (e) => {
      selecCardSeason(5)
    });

    $(".cardSeason6").addEventListener("click", (e) => {
      selecCardSeason(6)
    })



    // -- BTN Pagen Episode

    $("#next-pageEpisodes").addEventListener("click", (e) => {
      loadNextPageEpisodes();
    });

    $("#last-pageEpisodes").addEventListener("click", (e) => {
      loadLastPageEpisodes();
    });

    $("#previous-pageEpisodes").addEventListener("click", (e) => {
      loadPreviousPageEpisodes();
    });

    $("#first-pageEpisodes").addEventListener("click", (e) => {
      loadfirstpageEpisodes();
    });

    $numPageEpisodes.addEventListener("change", (e) => {
      paginationEpisodes();
    })


   //  -- BTN Pages Locations -- 
   $nextPageLocation.addEventListener("click", (e) => {
      nextPageLocation();
   })

   $previousPageLocation.addEventListener("click", (e) => {
      previousPageLocation();
   })
   
   $numPageLocation.addEventListener("change", (e) => {
      inputPaginationLocations($numPageLocation.value);
   })

   $firstPageLocation.addEventListener("click", (e) => {
      firstPageLocation();
   })


   $lastPageLocation.addEventListener("click", (e) => {
      lastPageLocation();
   })

})