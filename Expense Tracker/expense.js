var ExpenseTrack = /** @class */ (function () {
    function ExpenseTrack() {
        this.expItems = [];
    }
    ExpenseTrack.prototype.addItem = function (item) {
        var _this = this;
        if (this.editCategory) {
            var index = this.expItems.findIndex(function (x) { return x.category === _this.editCategory; });
            if (index > -1) {
                this.expItems[index] = item;
                this.editCategory = "";
            }
        }
        else {
            this.expItems.push(item);
            console.log(item);
        }
    };
    ExpenseTrack.prototype.getItem = function () {
        return this.expItems;
    };
    ExpenseTrack.prototype.delItem = function (category) {
        this.expItems = this.expItems.filter(function (x) { return x.category !== category; });
    };
    ExpenseTrack.prototype.editItem = function (editcategory) {
        this.expItems = this.expItems.filter(function (x) { return x.category !== editcategory; });
    };
    return ExpenseTrack;
}());
var ExpItem = /** @class */ (function () {
    function ExpItem(amount, category, date) {
        this.amount = amount;
        this.category = category;
        this.date = date;
    }
    return ExpItem;
}());
var exp = new ExpenseTrack();
var amountIn = document.getElementById('amount');
var categoryIn = document.getElementById('category');
var dateIn = document.getElementById('date');
var submit = document.getElementById('submit');
var table = document.getElementById('table-body');
var renderItems = function () {
    table.innerHTML = '';
    exp.getItem().forEach(function (item, index) {
        var row = table.insertRow();
        row.innerHTML = "\n            <td>".concat(item.amount, "</td>\n            <td>").concat(item.category, "</td>\n            <td>").concat(item.date, "</td>\n            <td><button id=\"edit-").concat(index, "\">Edit</button></td>\n            <td><button id=\"delete-").concat(index, "\">Delete</button></td>\n        ");
        var deleteBtn = document.getElementById("delete-".concat(index));
        deleteBtn.addEventListener('click', function () {
            exp.delItem(item.category);
            renderItems();
        });
        var edit = document.getElementById("edit-".concat(index));
        edit.addEventListener('click', function () {
            exp.editItem(item.category);
            amountIn.value = item.amount.toString();
            categoryIn.value = item.category;
            dateIn.value = item.date;
        });
    });
};
var clearInputs = function () {
    amountIn.value = '';
    categoryIn.value = '';
    dateIn.value = '';
};
submit.addEventListener('click', function () {
    var amount = parseFloat(amountIn.value);
    var category = categoryIn.value;
    var date = dateIn.value;
    var newExp = new ExpItem(amount, category, date);
    if (amount && category && date) {
        exp.addItem(newExp);
        renderItems();
        clearInputs();
    }
    else {
        alert('Please fill out all fields.');
    }
});
renderItems();
