// choosing the save button
let button = document.querySelector(".save_button");

// Choose the input field.
let siteName = document.querySelector("[name='mySiteName']");
let url = document.querySelector("[name='url']");

// Choose the div with the "bookmarks" class.
let view_bookmarksSection = document.querySelector(".view_bookmarks");

// Keeping bookmarked pages in local storage
if(typeof(localStorage.btn_bookmark) == "undefined"){
   localStorage.btn_bookmark = "";
}



// listener for the form to submit
button.addEventListener("click", function(e){
            // Stop the page from refreshing after you submit the form.
               e.preventDefault();
               let patterURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
               let arrayItems, check = false, adr, itemAdr;
               
               // this is Form and URL validation
               if(siteName.value === ""){
                  alert("you must fill the siteName input");
               } else if(url.value === ""){
                  alert("you must fill the url input");
               } else if(!patterURL.test(url.value)){
                  alert("you must enter a valid url");
               } else{
                  arrayItems = localStorage.btn_bookmark.split(";");
                  adr = url.value;
                  adr = adr.replace(/http:\/\/|https:\/\//i, "");
                  arrayItems.length--;
                  
                  // See if the URL has already been bookmarked
                  for(item of arrayItems){
                     itemAdr = item.split(',')[1].replace(/http:\/\/|https:\/\//i,"");
                     if(itemAdr == adr){
                        check = true;
                     }
                  }
                  if(check == true){
                     alert("This website is already bookmarked");
                  }
                  else{
                  
                     // If everything is in order, add the bookmark to local storage
                     localStorage.btn_bookmark += `${siteName.value},${url.value};`;
                     addBookmark(siteName.value, url.value);
                     siteName.value = "";
                     url.value = "";
                  }
               }
            });




// Adding the bookmark functionality
function addBookmark(name, url){
            let dataLink = url;
            
            // Once a bookmark is retrieved, it is displayed in a
            // div with a button to visit the link or delete it
            if(!url.includes("http")){
               url = "//" + url;
            }
            let item = `<div class="btn_bookmark">
               <span>${name}</span>
               <a class="visit" href="${url}" target="_blank"
                  data-link='${dataLink}'>Visit</a>
               <a onclick="removeBookmark(this)"
                  class="delete" href="#">Delete</a>
            </div>`;
            view_bookmarksSection.innerHTML += item; 
         }





// function to render the bookmarks you've stored
(function fetchBoookmark(){
            if(typeof(localStorage.btn_bookmark) != "undefined" && localStorage.btn_bookmark !== ""){
               let arrayItems = localStorage.btn_bookmark.split(";");
               arrayItems.length--;
               for(item of arrayItems){
                  let itemSpli = item.split(',');
                  addBookmark(itemSpli[0], itemSpli[1]);
               }
            }
         })();




         // Perform the bookmark removal function

function removeBookmark(thisItem){
            let arrayItems = [],
            index,
            item = thisItem.parentNode,
            itemURL = item.querySelector(".visit").dataset.link,
            itemName = item.querySelector("span").innerHTML;
            arrayItems = localStorage.btn_bookmark.split(";");
            for(i in arrayItems){
               if(arrayItems[i] == `${itemName},${itemURL}`){
                  index = i;
                  break;
               }
            }
            
            // localStorage should be updated
            index = arrayItems.indexOf(`${itemName},${itemURL}`);
            arrayItems.splice(index,1);
            localStorage.btn_bookmark = arrayItems.join(";");
            
            // bookmark Section should be updated
            view_bookmarksSection.removeChild(item);
         }










