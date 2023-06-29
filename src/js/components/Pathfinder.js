import { select } from "../settings.js";

class Pathfinder {
    constructor(element){
        const thisPathifinder = this;

        thisPathifinder.element = element;
        thisPathifinder.dom = {};
        thisPathifinder.settings = {
            isStarted : false,
            drawAllowed : false,
            area: [],
        }

        thisPathifinder.renderBoard();
        thisPathifinder.getElements();
        thisPathifinder.initActions();
    }

    renderBoard(){
        const thisPathfinder = this;

        thisPathfinder.dom.board = thisPathfinder.element.querySelector(select.containerOf.pathifinderBoard);
        let y = 10;
        let id = 1;

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

        /* add event listeners for button to set start position*/
        thisPathfinder.dom.button.addEventListener('click', function(){
            if(thisPathfinder.settings.isStarted == false){
                const id = thisPathfinder.settings.startFieldID;
                const startField = thisPathfinder.element.querySelector('[data-id="'+ id + '"]')
                console.log(startField);
            thisPathfinder.setStart(startField);
            }
        })

        thisPathfinder.element.addEventListener('click', function(event){
            if(thisPathfinder.settings.drawAllowed == true
                && event.target.classList.contains('drawAllowed')){
                    console.log(event.target)
                    thisPathfinder.drawArea(event.target);
            }

        })

        thisPathfinder.element.addEventListener('click', function(event){
            if(thisPathfinder.settings.drawAllowed == true
                && (event.target.classList.contains('areaAllowed') ||
                    event.target.classList.contains('area')) ){
                    console.log(event.target)
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
        console.log('setStart');

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

        console.log(thisPathfinder.settings.area);

        if(thisPathfinder.settings.area.indexOf(field.dataset.id) == -1){
            thisPathfinder.settings.area.push(field.dataset.id);
        } else {
            const index = thisPathfinder.settings.area.indexOf(field.dataset.id);
            thisPathfinder.settings.area.splice(index);
        }


        for (let item of fields){
            item.classList.remove('areaAllowed');
        }

        for (let item of fields){
            for (let areaField of thisPathfinder.settings.area){
                if (item.dataset.id == areaField){
                    const x = parseInt(item.dataset.x);
                    const y = parseInt(item.dataset.y);

                    const areaAllowed = [
                    thisPathfinder.element.querySelector('[data-x="'+ x +'"][data-y="'+ (y+1) +'"]'),
                    thisPathfinder.element.querySelector('[data-x="'+ (x+1) +'"][data-y="'+ y +'"]'),
                    thisPathfinder.element.querySelector('[data-x="'+ x +'"][data-y="'+ (y-1) +'"]'),
                    thisPathfinder.element.querySelector('[data-x="'+ (x-1) +'"][data-y="'+ y +'"]'),
                    ]

                    for (let areaAllowedField of areaAllowed){
                        if(!areaAllowedField.classList.contains('area')){
                            areaAllowedField.classList.add('areaAllowed');
                        }

                    }
                }
            }
        }
    }

}

export default Pathfinder;
