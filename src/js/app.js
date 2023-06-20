import { select } from "./settings.js";
import Pathfinder from "./components/Pathfinder.js";

const app = {
    initPages: function(){
        const thisApp = this;

        thisApp.pages = document.querySelector(select.containerOf.pages).children;
        thisApp.navLinks = document.querySelectorAll(select.nav.links)

        /* get hash from location*/
        const idFromHash = window.location.hash.replace( '#/', '');

        /* set default matching hash */
        let pageMatchingHash = thisApp.pages[0].id;

        /* check if id from hash exist in page.id nodelist, if so, set page.id as pagematching hash */
        for (let page of thisApp.pages){
            if(page.id == idFromHash){
                pageMatchingHash = page.id;
                break;
            }
        }

        thisApp.activatePage(pageMatchingHash);

        for(let navLink of thisApp.navLinks){
            navLink.addEventListener('click', function(event){
                const clickedElement = this;
                event.preventDefault();

                const pageID = clickedElement.getAttribute('href').substring(1);
                thisApp.activatePage(pageID);

                window.location.hash = '#/' + pageID;
            })
        }
    },

    activatePage: function(pageID){
        const thisApp = this;

        for(let page of thisApp.pages){
           page.classList.toggle('active', page.id == pageID);
        }
    },

    initPathfinder: function(){
        const thisApp = this;

        const pathfinderElem = document.querySelector(select.containerOf.pathFinder);
        thisApp.pathFinder =  new Pathfinder(pathfinderElem);
    },

    init: function(){
        const thisApp = this;

        thisApp.initPages();
        thisApp.initPathfinder();
    }
}

app.init();
