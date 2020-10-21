class Grocery {
    name: string;
    quantity: number;
    price : number;

    constructor(name:string, quantity:number, price: number){
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}

function isNumber(value: string | number): boolean
{
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}

function clearOutInputFields(inputField: HTMLInputElement){
    inputField.value = '';
}

window.onload = function(){
    let groceryArray = Array<Grocery>();
    let itemNameInput = document.getElementById('item_name') as HTMLInputElement;
    let itemQtyInput = document.getElementById('item_qty') as HTMLInputElement;
    let itemPriceInput = document.getElementById('item_price') as HTMLInputElement;
    let groceryDom = document.getElementById("grocery_item");
    let taxInput = document.getElementById("tax_input") as HTMLInputElement;
    let totalPrice  = document.getElementById("total_price");
    let tax  = document.getElementById("tax");
    let addItemBtn = document.getElementById('add_item');
    let taxBtn = document.getElementById('tax_btn');
    let totalPriceValue = 0;
    
    addItemBtn.addEventListener("click", function(){
        if (itemNameInput.value === ''){
            alert("Item Name cannot be empty");
        }else if(!isNumber(itemPriceInput.value)){
            alert("Item Price is invalid");
        }else if(!isNumber(itemQtyInput.value)){
            alert("Item Qty is invalid");
        }
        else{
            var li = document.createElement("li");
            const element = new Grocery(itemNameInput.value, Number(itemQtyInput.value), Number(itemPriceInput.value));
            groceryArray.push(element);

            li.innerText = `${element.name} - $${element.price.toFixed(2)} - ${element.quantity}`;
            groceryDom.appendChild(li);

            clearOutInputFields(itemNameInput);
            clearOutInputFields(itemPriceInput);
            clearOutInputFields(itemQtyInput);
        }
    });

    taxBtn.addEventListener("click", function(){
        if (!isNumber(taxInput.value)){
            alert("Tax is invalid");
        }
        else{
            groceryArray.forEach(function(element){
                totalPriceValue += (element.price * element.quantity);
            });

            let finalTax = Number(taxInput.value) * totalPriceValue / 100;
            tax.textContent = `$${finalTax.toFixed(2)}`;
            let priceWithTax = totalPriceValue + finalTax;
            totalPrice.textContent = `$${priceWithTax.toFixed(2)}`;
        }
    });
}
