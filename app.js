

// BUDGET CONTROLLER
var budgetController = (function() {
    //function constructor - see the var name starts with a capital letter to distiguish it from other functions
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id; 
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc:[]
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            //create new ID 
            if (data.allItems[type].length > 0) {
                ID  = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;

            }
            

            //create new item based on inc exp type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            //push it to the tructure
            data.allItems[type].push(newItem);
            //return new item 
            return newItem;
        },

        testing: function() {
            console.log(data);
        }
    };

})();

//UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer:'.income__list',
        expensesContainer: '.expenses__list'

    };

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            };     
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            //create html string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }   
            //replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);




            //insert the HTML into the DOM 
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)


        },

        clearFields: function() {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

        
            //this will turn the list above into an array using the slice method
            //which is a prototype of the Array =) SOOOO COOL!~!!!!!!!
           fieldsArr = Array.prototype.slice.call(fields);
            //this function can receive up to three arguments 
           fieldsArr.forEach(function(current, index, array) {
                current.value = "";
           });
           //this will set the cursor back to the "Add description box"
           //instead of leaving it in the "value box"
           fieldsArr[0].focus();

        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();




//GLOBAL APP CONTROLLER
/*we are passing two parametters in the controller's function and calling them at the
bottom. */
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListener = function() {

        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)

        //this will allow users to add the input by pressing 'enter'
        //note we are using even.which (for older browsers same thing as event.keycode)
        document.addEventListener('keypress', function(event) {
          if (event.keyCode === 13 || event.which === 13) {
              ctrlAddItem();
              }   
        });
    }


    
    //dry - dont repeat yourself - so we are creting a function to re-use later
    var ctrlAddItem = function() {
        var input, newItem;
        //1 Get the field input data
        input = UICtrl.getInput();
      //2 add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      //3 add the new item to the new UI 
      UICtrl.addListItem(newItem, input.type);
      //4 clear up the  fields
      UICtrl.clearFields();
      //5 calculate the budget

      //6 display the budget on the UI

    
    };
    
    return {
        // initialization function
        init: function() {
            console.log('Application has started');
            setupEventListener();
        }
    }
})(budgetController, UIController);

controller.init();