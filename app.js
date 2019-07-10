
//BUDGET CONTROLLER
var budgetController = (function() {



})();


//UI CONTROLLER
var UIController = (function() {

})();



//GLOBAL APP CONTROLLER

var controller = (function(bundgetCtrl, UICtrl) {

    //dry - dont repeat yourself - so we are creting a function to re-use later
    var ctrlAddItem = function() {

        //1 Get the field input data

      //2 add the item to the budget controller

      //3 add the new item to the new UI 

      //4 calculate the budget

      //5 display the budget on the UI

        console.log('It works bitches');
    }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)

  //this will allow users to add the input by pressing 'enter'
  //note we are using even.which (for older browsers sane thing as event.keycode)
  document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
    }
  });


    
})(budgetController, UIController);