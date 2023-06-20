
class Pathfinder {
    constructor(element){
        const thisPathifinder = this;

        thisPathifinder.element = element;

        thisPathifinder.renderBoard();
        thisPathifinder.getElements();
        thisPathifinder.initActions();
    }

    renderBoard(){
        const thisPathfinder = this;
        let y = 10;

        for (let i = 0; i < 10 ; i++){
            const row = document.createElement('div');
            row.className = 'row justify-content-center row' + (i+1);
            let x = 1;
            thisPathfinder.element.appendChild(row);
            for(let z = 0; z < 10 ; z++){
                const fied = document.createElement('div');
                fied.className = 'col-1 field y-' + y + ' x-' + x;
                row.appendChild(fied);
                x ++;
            }

            y = y-1;
        }
    }

    getElements(){
        const thisPathfinder = this;

        thisPathfinder.fields = thisPathfinder.element.querySelectorAll('.field');
    }

    initActions(){
        const thisPathfinder = this

        thisPathfinder.element.addEventListener('click', function(event){
            // event.preventdefault();

            console.log(event.target);


            event.target.classList.toggle('chosen')

        })
    }
}

export default Pathfinder;
