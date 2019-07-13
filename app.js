
//BUDGET CONTROLLER
var budgetController = (function() {



})();


//UI CONTROLLER
var UIController = (function() {

    return {
        getinput: function () {
            return {

                type: document.querySelector('.add__type').value, //will be either inc or exp
                description:  document.querySelector('.add__description').value,
                value: document.querySelector('.add__value').value,

            };
        }
    };

})();



//GLOBAL APP CONTROLLER

var controller = (function(bundgetCtrl, UICtrl) {

    //dry - dont repeat yourself - so we are creting a function to re-use later
    var ctrlAddItem = function() {

        //1 Get the field input data

        var input = UICtrl.getInput

        console.log(input);

      //2 add the item to the budget controller

      //3 add the new item to the new UI 

      //4 calculate the budget

      //5 display the budget on the UI

    }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)

  //this will allow users to add the input by pressing 'enter'
  //note we are using even.which (for older browsers same thing as event.keycode)
  document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
        }


  });


    
})(budgetController, UIController);