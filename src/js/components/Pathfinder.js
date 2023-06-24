import { select } from "../settings.js";

class Pathfinder {
    constructor(element){
        const thisPathifinder = this;

        thisPathifinder.element = element;
        thisPathifinder.dom = {};
        thisPathifinder.settings = {
            isStarted : false,
        }

        thisPathifinder.renderBoard();
        thisPathifinder.getElements();
        thisPathifinder.initActions();
    }

    renderBoard(){
        const thisPathfinder = this;

        thisPathfinder.dom.board = thisPathfinder.element.querySelector(select.containerOf.pathifinderBoard);
        let y = 10;

        for (let i = 0; i < 10 ; i++){
            const row = document.createElement('div');
            row.className = 'row justify-content-center row' + (i+1);
            let x = 1;
            thisPathfinder.dom.board.appendChild(row);
            for(let z = 0; z < 10 ; z++){
                const field = document.createElement('div');
                field.className = 'col-1 field';
                field.dataset.y = y;
                field.dataset.x = x;
                row.appendChild(field);
                x ++;
            }
            y = y-1;
        }
    }

    getElements(){
        const thisPathfinder = this;

        thisPathfinder.dom.fields = thisPathfinder.element.querySelectorAll('.field');
        thisPathfinder.dom.button = thisPathfinder.element.querySelector('button');
    }

    initActions(){
        const thisPathfinder = this

        /* add event listeners for choose start positions and get positition x, y coordinates */
        thisPathfinder.element.addEventListener('click', function(event){
            if(thisPathfinder.settings.isStarted == false && event.target.classList.contains('field')){
                thisPathfinder.chooseStart(event.target);
                console.log(event.target);
            }

        })

        /* add event listeners for button to dispatch event with load that includes position, and distance to closest fields from it*/
        thisPathfinder.dom.button.addEventListener('click', function(){
            if(thisPathfinder.settings.isStarted == false){
            thisPathfinder.setStart();
            }

        })

    }
    chooseStart(field){
        const thisPathfinder = this;

        const posY = field.getAttribute('data-y');
        const posX = field.getAttribute('data-x');
        thisPathfinder.settings.startPosition = {
            x : posX,
            y : posY,
        }

        for(let item of thisPathfinder.dom.fields){
            item.classList.toggle('chosen', item == field);
            thisPathfinder.dom.board.addEventListener('update', function(){
                if(item == field){
                item.classList.add('setStart');
                thisPathfinder.settings.isStarted = true;
                }
            })
        }
        console.log(thisPathfinder);


    }
    setStart(){
        const thisPathfinder = this;

        const load = {
            position: {
                x: thisPathfinder.settings.startPosition.x,
                y: thisPathfinder.settings.startPosition.y,
            },
            distance: 0,
        }

        const event = new CustomEvent ('update', {
            bubbles: true,
            detail: {
                field: load,
            }
        })
        thisPathfinder.dom.board.dispatchEvent(event);
    }
}

export default Pathfinder;
