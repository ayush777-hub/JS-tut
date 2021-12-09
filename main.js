let is_filled;
is_filled = [0, 0, 0, 0, 0, 0, 0, 0, 0];
turn = 0;

//function to check if this cell leads to a win or not
function check(cell) {
    if (cell === 0) {
        if ((is_filled[0] === is_filled[1] && is_filled[1] === is_filled[2]) || (is_filled[0] === is_filled[3] && is_filled[3] === is_filled[6]) || (is_filled[0] === is_filled[4] && is_filled[4] === is_filled[8])) {
            return 1;
        }
    }
    else if (cell == 1) {
        if ((is_filled[0] === is_filled[1] && is_filled[1] === is_filled[2]) || (is_filled[1] === is_filled[4] && is_filled[4] === is_filled[7])) {
            return 1;
        }
    }
    else if (cell == 2) {
        if ((is_filled[0] === is_filled[1] && is_filled[1] === is_filled[2]) || (is_filled[2] === is_filled[5] && is_filled[5] === is_filled[8]) || (is_filled[2] === is_filled[4] && is_filled[4] === is_filled[6])) {
            return 1;
        }
    }
    else if (cell == 3) {
        if ((is_filled[3] === is_filled[0] && is_filled[3] === is_filled[6]) || (is_filled[3] === is_filled[5] && is_filled[5] === is_filled[4])) {
            return 1;
        }
    }
    else if (cell == 4) {
        if ((is_filled[0] === is_filled[4] && is_filled[4] === is_filled[8]) || (is_filled[2] === is_filled[4] && is_filled[4] === is_filled[6]) || (is_filled[1] === is_filled[4] && is_filled[4] === is_filled[7]) || (is_filled[3] === is_filled[4] && is_filled[4] === is_filled[5])) {
            return 1;
        }
    }
    else if (cell == 5) {
        if ((is_filled[3] === is_filled[4] && is_filled[3] === is_filled[5]) || (is_filled[5] === is_filled[2] && is_filled[5] === is_filled[8])) {
            return 1;
        }
    }
    else if (cell == 6) {
        if ((is_filled[0] === is_filled[3] && is_filled[3] === is_filled[6]) || (is_filled[6] === is_filled[7] && is_filled[7] === is_filled[8]) || (is_filled[6] === is_filled[4] && is_filled[4] === is_filled[2])) {
            return 1;
        }
    }
    else if (cell == 7) {
        if ((is_filled[7] === is_filled[6] && is_filled[7] === is_filled[8]) || (is_filled[7] === is_filled[4] && is_filled[4] === is_filled[1])) {
            return 1;
        }
    }
    else {
        if ((is_filled[7] === is_filled[6] && is_filled[7] === is_filled[8]) || (is_filled[8] === is_filled[4] && is_filled[4] === is_filled[0]) || (is_filled[8] === is_filled[5] && is_filled[5] === is_filled[2])) {
            return 1;
        }
    }
    return 0;
}

//removes the on-click eventlistener on cells of the grid
function removefunc() {
    arr.forEach(element => {
        element.removeEventListener("click", addsign);
    });
}

//adds on-click eventlistener on cells of grid
function addsign() {
    clicked_cell = Number((this.id)[7]) - 1; //here this refers to the element that called the function
    if (is_filled[clicked_cell] == 0) {     //accepts entry only if the cell is not filled
        if (turn == 0) {
            is_filled[clicked_cell] = 1;
            console.log(this.childNodes[0]);
            //console.log(element.b);
            let new_ele = document.createElement("img");
            new_ele.src = "media/cross.png"
            new_ele.className = "cell_img"
            this.replaceChild(new_ele, this.childNodes[0]);     //replacing the child with newly created childnode
            let ret = check(clicked_cell);
            if (ret === 1) {
                Body = document.body;
                result_msg = document.createElement("div");
                result_msg.innerHTML = "<h1>PLAYER 1 WINS!!!</h1>";
                result_msg.className = "Res_msg";
                Body.appendChild(result_msg);
                removefunc();
            }
            else{
                let flag = 0;
                for (let i = 0; i < is_filled.length; i++) {
                    if(is_filled[i]===0){
                        flag=1;
                    }
                }
                if (flag===0) {
                    Body = document.body;
                    result_msg = document.createElement("div");
                    result_msg.innerHTML = "<h1>TIE!!!</h1>";
                    result_msg.className = "Res_msg";
                    Body.appendChild(result_msg);
                    removefunc();
                }
            }
        }
        else {
            is_filled[clicked_cell] = 2;
            let new_ele = document.createElement("img");
            new_ele.src = "media/circle.png"
            new_ele.className = "cell_img"
            this.replaceChild(new_ele, this.childNodes[0]);
            let ret = check(clicked_cell);
            if (ret === 1) {
                Body = document.body;
                result_msg = document.createElement("h1");
                result_msg.innerText = "PLAYER 2 WINS!!!";
                result_msg.className = "Res_msg";
                Body.appendChild(result_msg);
                removefunc();
                //break;
            }
            else{
                let flag = 0;
                for (let i = 0; i < is_filled.length; i++) {
                    if(is_filled[i]===0){
                        flag=1;
                    }
                }
                if (flag===0) {
                    Body = document.body;
                    result_msg = document.createElement("div");
                    result_msg.innerHTML = "<h1>TIE!!!</h1>";
                    result_msg.className = "Res_msg";
                    Body.appendChild(result_msg);
                    removefunc();
                }
            }
        }
        turn += 1;
        turn %= 2;
    }
    else {      //throws an alert if player clicks on already filled cell
        alert("cell already filled!!! Enter a valid move");
    }
}

items = document.getElementsByClassName("grid_item")    
arr = [...items]      //converting HTML collection to an array
arr.forEach(element => {
    //console.log(element);
    element.addEventListener("click", addsign);
});

function reset_cell(params) {               //when reset button is clicked it clears the grid and other previous screen outputs.
    is_filled = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    turn = 0;
    console.log("array resetted:");
    is_filled.forEach(element => {
        console.log(`${element} `);
    });
    arr.forEach(element => {
        set_blank = document.createElement("b");
        set_blank.innerText = "";
        element.replaceChild(set_blank, element.children[0]);
    });
    arr.forEach(element => {
        //console.log(element);
        element.addEventListener("click", addsign);
    });
    body_content = document.getElementsByTagName("body");
    console.log(Array.from(body_content)[0].children);
    body_content[0].removeChild(Array.from(body_content)[0].children[6]);
}