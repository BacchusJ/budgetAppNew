

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

    var date = {
        allItems: {
            exp: [],
            inc:[]
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

})();

//UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'

    };

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            };     
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

        //1 Get the field input data
        var input = UICtrl.getInput();
      //2 add the item to the budget controller

      //3 add the new item to the new UI 

      //4 calculate the budget

      //5 display the budget on the UI

    
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