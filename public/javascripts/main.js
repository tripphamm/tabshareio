$(document).ready(function() {
    var validateCurrency = function ($inputElem) {
        var regex = /^\d+(?:\.\d{0,2})$/;
        var numStr = $inputElem.val();
        if (regex.test(numStr))
            return +numStr;
        return false;
    }

    var validateNumber = function ($inputElem) {
        var numStr = $inputElem.val();
        var numNum = +numStr;
        if (isNaN(numNum) || numNum === 0)
            return false;
        return numNum;
    }

    var splitPossible = function (totalAmount, numPeople) {
        return totalAmount * 100 > numPeople;
    }

    var displaySplitCost = function (num) {
        $("#split-cost").text('$' + num.toFixed(2) + " USD");
    }

    var calculateSplit = function () {
        var totalAmountCad = validateCurrency($("input[name=total_amount_cad]"));
        var numPeople = validateNumber($("select[name=num_people]"));

        if (totalAmountCad === false || numPeople === false || !splitPossible(totalAmountCad, numPeople)) {
            displaySplitCost(0); // reset display
            return;
        }

        var costPerPersonCad = totalAmountCad / numPeople;
        var costPerPersonUsd = costPerPersonCad * 0.77;

        displaySplitCost(costPerPersonUsd);
    }

    $(".input-parameter").on("change keyup paste", calculateSplit);
});