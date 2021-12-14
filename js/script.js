let menuList =document.querySelector(".menu")
let elForm = document.querySelector(".form");
let elInput = document.querySelector(".input");
let selectGenres = document.querySelector(".select");
let selectFilter = document.querySelector(".filter");
let elBtn = document.querySelector(".btn");
let elTemplate = document.querySelector(".template").content;
let elModal = document.querySelector(".modal")
let elText = document.querySelector(".text")
let elExit = document.querySelector(".exit")
let elBox = document.querySelector(".box")

function renderDate(time){
    let date = new Date(time);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return day + "." + month + "." +year;
}

function renderMoveies(Arr, element){
    element.innerHTML = null
    Arr.forEach((film)=>{
        let cloneTemplate = elTemplate.cloneNode(true)
        cloneTemplate.querySelector(".img").src = film.poster;
        cloneTemplate.querySelector(".title").textContent = film.title;
        cloneTemplate.querySelector(".time").setAttribute("datetime", renderDate(film.release_date));
        cloneTemplate.querySelector(".time").textContent = renderDate(film.release_date);
        cloneTemplate.querySelector(".btn2").dataset.id = film.id;
        let elBtn2 = cloneTemplate.querySelector(".btn2")
        element.appendChild(cloneTemplate)

        elBtn2.addEventListener('click', function(e){
            e.preventDefault();
            let findModal = Arr.find((item)=>item.id === e.target.dataset.id)
            elModal.classList.add("modal-active")
            elText.textContent = findModal.overview;

            // console.log(e.target)
            // console.log(e.target.dataset.id);
        // console.log(findModal);

            elExit.addEventListener("click", function(e){
                e.preventDefault();
                elModal.setAttribute("class", "modal")

            })
            elModal.addEventListener("click", function(e){
                e.preventDefault();
                elModal.setAttribute("class", "modal")
            })
            elBox.addEventListener("submit", function(e){
                e.preventDefault();
                elModal.classList.multiply("modal-active")
            })


        })
    })

   
}

renderMoveies(films, menuList)


function renderGenres(parametr, element){
    let result = []
    parametr.forEach((film)=>{
        film.genres.forEach((janr)=>{
            if(!result.includes(janr)){
                result.push(janr)
            }
        })
    })
   
    result.forEach((genre)=>{
        let newOption = document.createElement("option");
        newOption.setAttribute("value", genre);
        newOption.textContent = genre;
        element.appendChild(newOption)
    })

}

renderGenres(films, selectGenres)

elForm.addEventListener("submit", function(e){
    e.preventDefault();
   
    let inputValue = elInput.value;
    let selectValue = selectGenres.value;
    let filterValue = selectFilter.value;
    let regex = RegExp(inputValue , "gi")
    let filtered = films.filter((film)=>film.title.match(regex))

    // console.log(filtered);
    let foundFilms = [];
    if(selectValue == "All"){
     foundFilms = filtered; 
     
    }else{
         let findFilms = filtered.filter((film)=>film.genres.includes(selectValue)) ;
        foundFilms = findFilms;
    }

    if(filterValue == "a_z"){
        foundFilms.sort((a,b)=>{
            if(a.title > b.title){
                return 1
            }
            else if(a.title < b.title){
                return -1
            }
            else{
                return 0
            }
        })
    }
    else if(filterValue == "z_a"){
        foundFilms.sort((a,b)=>{
            if(a.title > b.title){
                return -1
            }
            else if(a.title < b.title){
                return 1
            }
            else{
                return 0
            }
        })
    }
    else if(filterValue == "new_old"){
        foundFilms.sort((a,b)=>{
            if(a.release_date > b.release_date){
                return -1
            }
            else if(a.release_date < b.release_date){
                return 1
            }
            else{
                return 0
            }
        })
    }

    else if(filterValue == "old_new"){
        foundFilms.sort((a,b)=>{
            if(a.release_date > b.release_date){
                return 1
            }
            else if(a.release_date < b.release_date){
                return -1
            }
            else{
                return 0
            }
        })
    }



    
    renderMoveies(foundFilms, menuList)







    // renderMoveies(foundFilms, menuList)
})


