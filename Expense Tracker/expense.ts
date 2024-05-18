interface Expense {
    amount: number;
    category: string;
    date: string;
}

class ExpenseTrack {
    expItems: Expense[] = [];
    editCategory:string;

    addItem(item: Expense) {
        if(this.editCategory){
            const index=this.expItems.findIndex(x=>x.category===this.editCategory)
            if(index >-1){
                this.expItems[index]=item
                this.editCategory=""

            }
        }
        else{
            this.expItems.push(item);
            console.log(item)
        }
        }
       

    getItem() {
        return this.expItems;
    }

    delItem(category: string) {
        this.expItems=this.expItems.filter(x=>x.category !== category);
    }
    editItem(editcategory:string){
        this.expItems=this.expItems.filter(x=>x.category !== editcategory)

    }
}

class ExpItem implements Expense {
    constructor(public amount: number, public category: string, public date: string) {}
}

const exp = new ExpenseTrack();
const amountIn = document.getElementById('amount') as HTMLInputElement;
const categoryIn = document.getElementById('category') as HTMLInputElement;
const dateIn = document.getElementById('date') as HTMLInputElement;
const submit = document.getElementById('submit') as HTMLButtonElement;
const table = document.getElementById('table-body') as HTMLTableElement;

const renderItems = () => {
    table.innerHTML = '';
    exp.getItem().forEach((item, index) => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${item.amount}</td>
            <td>${item.category}</td>
            <td>${item.date}</td>
            <td><button id="edit-${index}">Edit</button></td>
            <td><button id="delete-${index}">Delete</button></td>
        `;
        const deleteBtn = document.getElementById(`delete-${index}`) as HTMLButtonElement;

        deleteBtn.addEventListener('click', () => {
            exp.delItem(item.category);
            renderItems();
        });
        const edit=document.getElementById(`edit-${index}`) as HTMLButtonElement;
        edit.addEventListener('click', () => {
            exp.editItem(item.category);
            amountIn.value = item.amount.toString();
            categoryIn.value = item.category;
            dateIn.value = item.date;
        });

    });
};

const clearInputs = () => {
    amountIn.value = '';
    categoryIn.value = '';
    dateIn.value = '';
};


submit.addEventListener('click', () => {
    const amount = parseFloat(amountIn.value);
    const category = categoryIn.value;
    const date = dateIn.value;
    const newExp = new ExpItem(amount, category, date);

    
   

    if (amount && category && date) {
        exp.addItem(newExp);
        renderItems();
        clearInputs();
    } else {
        alert('Please fill out all fields.');
    }
});

renderItems();
