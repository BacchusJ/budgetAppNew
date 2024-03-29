

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
    //function to calculate the items 
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc:[]
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        //set the percentage to -1 and not 0
        percentage: -1
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

        calculateBudget: function() {

            // calculate total income and expenses 
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate the budget: income -expenses
            data.budget = data.totals.inc - data.totals.exp;

            if (data.totals.inc > 0) {
                // calculate the % of income that has been spent
            //make sure you round the percentage - only if for the expense 
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }    

        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
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
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'

    };

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
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

        displayBudget: function(obj) {

            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;


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
    };

    var updateBudget = function() {

        //5 calculate the budget
        budgetCtrl.calculateBudget();

        //6 return the budget 
        var budget = budgetCtrl.getBudget();

        //7 display the budget on the UI

        UICtrl.displayBudget(budget);

    };


    
    //dry - dont repeat yourself - so we are creting a function to re-use later
    var ctrlAddItem = function() {
        var input, newItem;
        //1 Get the field input data
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

             //2 add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //3 add the new item to the new UI 
        UICtrl.addListItem(newItem, input.type);
        //4 clear up the  fields
        UICtrl.clearFields();
  
        // we are gonna move 5 and 6 to a separate function so that we can re-use them when we delete.
  
        // calculate and update budget
        updateBudget();
            
        }
    
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