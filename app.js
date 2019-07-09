var budgetController = (function() {

    var x = 23;
    var add = function(a) {
        return x + a 
    }

    return{
        //publicTest is what we call a "method"
        //it can access the variables above though they are out of the scope
        publicTest: function(b) {
            return add(b);

        }
    }

})();



var UIController = (function() {

})();


var controller = (function(bundgetCtrl, UICtrl) {

    var z = bundgetCtrl.publicTest(5);

    return{
        anotherPublic:function(){
            console.log(z);
        }
    }

})(budgetController, UIController);