import { select } from "../settings.js";
import { settings } from "../settings.js";

class Pathfinder {
    constructor(element){
        const thisPathifinder = this;

        thisPathifinder.element = element;
        thisPathifinder.dom = {};
        thisPathifinder.settings = {
            isStarted : false,
            drawAllowed : false,
            chooseStartPosition: false,
            chooseEndPosition: false,
            area: [],
        }

        thisPathifinder.renderBoard();
        thisPathifinder.getElements();
        thisPathifinder.initActions();
    }

    renderBoard(){
        const thisPathfinder = this;

        thisPathfinder.dom.board = thisPathfinder.element.querySelector(select.containerOf.pathifinderBoard);
        let y = settings.board.heigh;
        let id = 1;

        for (let i = 0; i < settings.board.heigh ; i++){
            const row = document.createElement('div');
            row.className = 'row justify-content-center row' + (i+1);
            let x = 1;
            thisPathfinder.dom.board.appendChild(row);
            for(let z = 0; z < settings.board.width ; z++){
                const field = document.createElement('div');
                field.className = 'col-1 field';
                field.dataset.y = y;
                field.dataset.x = x;
                field.dataset.id = id;
                row.appendChild(field);
                x ++;
                id ++;
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
            }

        })

        /* add event listeners for button*/
        thisPathfinder.dom.button.addEventListener('click', function(){
            if(thisPathfinder.settings.isStarted == false){
                const id = thisPathfinder.settings.startFieldID;
                const startField = thisPathfinder.element.querySelector('[data-id="'+ id + '"]')
            thisPathfinder.setStart(startField);

            }
        })

        /* add event listeners for drawAllowed area (div that contains '.drawAllowed' class) */
        thisPathfinder.element.addEventListener('click', function(event){
            if(thisPathfinder.settings.drawAllowed == true
                && (event.target.classList.contains('areaAllowed') ||
                    event.target.classList.contains('area')) ){
                    thisPathfinder.drawArea(event.target);
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
        thisPathfinder.settings.startFieldID = field.getAttribute('data-id');

        for(let item of thisPathfinder.dom.fields){
            item.classList.toggle('chosen', item == field);
        }
    }

    setStart(field){
        const thisPathfinder = this;

        for(let item of thisPathfinder.dom.fields){
            item.classList.toggle('setStart', item == field);
        }
        thisPathfinder.settings.isStarted = true;
        thisPathfinder.settings.drawAllowed = true;

        thisPathfinder.drawArea(field);
    }

    drawArea(field){
        const thisPathfinder = this;

        const fields =thisPathfinder.dom.fields;

        /* update area array */
        if(thisPathfinder.settings.area.indexOf(field.dataset.id) == -1){
            thisPathfinder.settings.area.push(field.dataset.id);
        } else {
            const index = thisPathfinder.settings.area.indexOf(field.dataset.id);
            thisPathfinder.settings.area.splice(index+1);
        }

        /* clear class in all fields */
        for (let item of fields){
            item.classList.remove('areaAllowed');
            item.classList.remove('area');

        }

        /* add class '.areaAllowed' for all fields next to chosen */
        for (let item of fields){
            for (let areaField of thisPathfinder.settings.area){
                if (item.dataset.id == areaField){
                    for (let nearbyId of thisPathfinder.getNearbyId(item)){
                        const nearbyField = thisPathfinder.element.querySelector('[data-id="'+nearbyId+'"]');
                        if(!nearbyField.classList.contains('area')){
                            nearbyField.classList.add('areaAllowed');
                        }
                    }
                }
            }
        }

        /* add class '.area' for all fields with data-id matching to pathfinder.settings.srea array */
        for (let areaID of thisPathfinder.settings.area){
            thisPathfinder.element.querySelector('[data-id="'+ areaID +'"]').classList.add('area');
        }
    }

    getNearbyId(item){
        const thisPathfinder = this;

        const arrayToReturn = [];

        const rightX = parseInt(item.getAttribute('data-x'))+1;
        const upY    = parseInt(item.getAttribute('data-y'))+1;
        const downY  = parseInt(item.getAttribute('data-y'))-1;
        const leftX  = parseInt(item.getAttribute('data-x'))-1;

        const right = thisPathfinder.element.querySelector(
            '[data-x="'+ rightX +'"][data-y="'+ item.dataset.y +'"]'
        );

        const up = thisPathfinder.element.querySelector(
            '[data-x="'+ item.dataset.x +'"][data-y="'+ upY +'"]'
        );

        const down = thisPathfinder.element.querySelector(
            '[data-x="'+ item.dataset.x +'"][data-y="'+ downY +'"]'
        );

        const left = thisPathfinder.element.querySelector(
            '[data-x="'+ leftX +'"][data-y="'+ item.dataset.y +'"]'
        );

        rightX <= settings.board.width ? arrayToReturn.push(right.dataset.id) : false;
        upY    <= settings.board.heigh ? arrayToReturn.push(up.dataset.id)    : false;
        leftX > 0 ? arrayToReturn.push(left.dataset.id) : false;
        downY > 0 ? arrayToReturn.push(down.dataset.id) : false;

        return arrayToReturn;
    }
}

export default Pathfinder;
