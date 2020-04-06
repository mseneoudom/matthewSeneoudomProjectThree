/* JS Objectives

    1. Get item color value by getting the user to select an option in the drop down menu which allows them to pick a color. With JS, we have assigned each selecion with a value which will then be stored in itemColor variable.

    2. Get item size. Same as above.

    3. Quantity * Price. Price is predefined per webpage. We will have a quantity section that defaults to 0, and will allow the user to increment the value up by 1 with no max, and decrement the value to a minimum of 0. The price will then update by mutliplying the price * quantity.

    4. Add to cart - All the values will generate a shopping cart list on the bottom of the page(position fixed maybe).
*/
let itemQuantity = 0;
let itemSize;
let itemColor;
let selectedItem;
let updatedPrice;
let checkOutList =[];
let removedCheckOutItem =[];
let totalItemQuantity = 0;
const inventory = {
    men :{
        shirts:{
            flightT:{
                name: 'Flight Over Fear',
                color: ['Red','Blue','Black','White','Grey'],
                size: ['Xtra Small', 'Small', 'Medium', 'Large', 'Xtra Large'],
                price: 25,
                image: '../suspendClothingPhotos/shootOne/TIG_4223.jpg',
                background: '../suspendClothingPhotos/shootOne/TIG_4244.jpg',
                galary: [
                    "../suspendClothingPhotos/shootOne/TIG_4265.jpg",
                    "../suspendClothingPhotos/shootOne/TIG_4237.jpg",
                    "../suspendClothingPhotos/shootOne/TIG_4244.jpg",
                    "../suspendClothingPhotos/shootOne/TIG_4297.jpg"
                ]
            },
            crimsonT:{
                name: 'Crimson',
                color: ['Red','Black','White','Navy'],
                size: ['Xtra Small', 'Small', 'Medium', 'Large', 'Xtra Large'],
                price: 40,
                image: '../suspendClothingPhotos/shootThree/liftstylePhoto/TIG_6509.jpg',
                background: '../suspendClothingPhotos/shootThree/liftstylePhoto/TIG_6650.jpg',
                galary: [
                    "../suspendClothingPhotos/shootThree/liftstylePhoto/TIG_6680.jpg",
                    "../suspendClothingPhotos/shootThree/liftstylePhoto/TIG_6677.jpg",
                    "../suspendClothingPhotos/shootThree/liftstylePhoto/TIG_6650.jpg",
                    "../suspendClothingPhotos/shootThree/liftstylePhoto/TIG_6591.jpg"
                ]
            },
            alchemyT:{
                name: 'Alchemy',
                color: ['Purple','Black','White','Grey'],
                size: ['Xtra Small', 'Small', 'Medium', 'Large', 'Xtra Large'],
                price: 60,
                image: '../suspendClothingPhotos/shootFour/lifestylePhoto/TIG_7388.jpg',
                background: '../suspendClothingPhotos/shootFour/lifestylePhoto/TIG_7388.jpg',
                galary: [
                    "../suspendClothingPhotos/shootFour/lifestylePhoto/TIG_7388.jpg",
                    "../suspendClothingPhotos/shootFour/lifestylePhoto/TIG_7202.jpg",
                    "../suspendClothingPhotos/shootFour/lifestylePhoto/TIG_7376.jpg",
                    "../suspendClothingPhotos/shootFour/lifestylePhoto/TIG_7176.jpg"
                ]
            }
        }
    }
}

// Select your item to sync options
$('#selectedItem').on('click', $('option.itemStyle'), function(e){
    // Get Item from Object
    selectedItem = $(this).val();
    
    // Empty the itemGalary images so that when a new option is selected, it can replace the current images
    $('.itemGalary').empty();
    $('#itemColor').empty();
    $('#itemSize').empty();



    // get Object background image
    $('.itemConfigSection').css({'background-image':'url('+(inventory['men']['shirts'][selectedItem]['background'])+')','background-repeat':'repeat','background-position':'20% 50%'});
    
    // get itemGalary images from Object
    for (let i=0; i<inventory['men']['shirts'][selectedItem]['galary'].length; i++){
        $('.itemGalary').append(`<div class="imageContainer previewImage"><img src="${inventory['men']['shirts'][selectedItem]['galary'][i]}" alt="${inventory['men']['shirts'][selectedItem]} image display # ${i}"></div>`)
    }
    
    // get colors available
    $('#itemColor').append(`<option value="defaultColor" selected disabled>Select a color</option>`);
    for (let i=0; i<inventory['men']['shirts'][selectedItem]['color'].length; i++){
        $('#itemColor').append(`<option value="color${inventory['men']['shirts'][selectedItem]['color'][i]}" class="itemColor itemColozr${inventory['men']['shirts'][selectedItem]['color'][i]}">${inventory['men']['shirts'][selectedItem]['color'][i]}</option>`)
    }

    // get size available
    $('#itemSize').append(`<option value="defaultSize" selected disabled>Select a size</option>`)
    for (let i=0; i<inventory['men']['shirts'][selectedItem]['size'].length; i++){
        $('#itemSize').append(`<option value="${inventory['men']['shirts'][selectedItem]['size'][i]}" class="itemSize itemSize${inventory['men']['shirts'][selectedItem]['size'][i]}">${inventory['men']['shirts'][selectedItem]['size'][i]}</option>`)
    }

    // $('.itemPrice').html(`Price: ${inventory.men.shirts.price}`);
    $('.itemPrice').html(`Price: $ ${inventory['men']['shirts'][selectedItem]['price']}`)

    // reset item quantity when new item is selected
    $('#itemQuantity').val(0);
    itemQuantity = 0;

})

// When you click an image within imageDisplayContainer, it will rearrange the HTML so the first item will have the specific css that will make it on display
$('.itemGalary').on('click','.previewImage', function(){
    $(this).prependTo('.itemGalary');
})


// Get itemColor value on click
$('#itemColor').on('click','option.itemColor', function(e){
    e.preventDefault();

    itemColor = $(this).html();
})

// Get itemSize value on click
$('#itemSize').on('click','option.itemSize', function(e){
    e.preventDefault();

    itemSize = $(this).html();
})

// Quantity Buttons + Changing the price by Quantity
$('.quantityUp').on('click', function(e){
    e.preventDefault();
    itemQuantity++;
    updatedPrice = itemQuantity * inventory['men']['shirts'][selectedItem]['price'];
    $('#itemQuantity').val(itemQuantity)
    $('.itemPrice').html(`Price: $${updatedPrice}`);
})
$('.quantityDown').on('click', function(e){
    e.preventDefault();
    itemQuantity--;
    updatedPrice = itemQuantity * inventory['men']['shirts'][selectedItem]['price'];
    $('#itemQuantity').val(itemQuantity)
    $('.itemPrice').html(`Price: $${updatedPrice}`);
    if(itemQuantity < 0){
        itemQuantity=0;
        updatedPrice = itemQuantity * inventory['men']['shirts'][selectedItem]['price'];
        $('#itemQuantity').val(itemQuantity)
        $('.itemPrice').html(`Price: $${updatedPrice}`);
    }
})

//Add to Cart  - Create Cart Item and Array
$('#addToCart').on('click', function(e){
    e.preventDefault();
    
    if(itemQuantity>0 && itemColor !== undefined && itemSize !== undefined ){
    $('.checkOutWindow').append(`<div class="checkOutItem">
    <div class="checkOutItemIcon">
        <div class="imageContainer">
            <img src="${inventory['men']['shirts'][selectedItem]['image']}" alt="">
        </div>
    </div>
    <div class="checkOutItemDescription">
        <div class="checkOutItemLI checkOutItemName">
            <p>${inventory['men']['shirts'][selectedItem]['name']}</p>
        </div>
        <div class="checkOutItemLI checkOutItemColor">
            <p>${itemColor}</p>
        </div>
        <div class="checkOutItemLI checkOutItemSize">
            <p>${itemSize}</p>
        </div>
        <div class="checkOutItemLI checkOutItemQuantity">
            <p>${itemQuantity}</p>
        </div>
        <div class="checkOutItemLI checkOutItemPrice">
            <p>Price/Unit: $${inventory['men']['shirts'][selectedItem]['price']}</p>
        </div>
        <div class="checkOutItemLI checkOutItemTotal">
            <p>Total Price: $${inventory['men']['shirts'][selectedItem]['price'] * itemQuantity}</p>
        </div>
        <div class="checkOutItemLI checkOutButtons">
            <button>Edit</button>
            <button class="removeItem">Remove Item</button>
        </div>
    </div>
</div>`
    );

    // Make the checkout window disapear after 7000 ms
    $('.checkOutWindow').animate({opacity:1.0},500);
    $('.checkOutWindow').delay().fadeIn();
    $('.checkOutWindow').delay(5000).fadeOut();
    }

    // Creart Array of newOrder
    let newOrder = [
        `${inventory['men']['shirts'][selectedItem]['name']}`,
        `${itemColor}`,
        `${itemSize}`,
        `${itemQuantity}`,
        `${inventory['men']['shirts'][selectedItem]['price']}`,
        `${inventory['men']['shirts'][selectedItem]['price'] * itemQuantity}`
    ];

    checkOutList.push(newOrder);
    // shopping cart number update
    for (let i=0; i<checkOutList.length; i++){
        totalItemQuantity += Number(checkOutList[i][3]);
    }
    for (let r = 0; r<removedCheckOutItem.length; r++){
        totalItemQuantity -= Number(removedCheckOutItem[r][3]);
    }
    $('.totalItemQuantity').html(`( ${totalItemQuantity} )`);
    
    totalItemQuantity = 0;
})


// when remove button is clicked, create add the item to a new array, deduct the total from the cart, remove the item added window
$('.checkOutWindow').on('click', 'button.removeItem', function(){
    let removedItemsArray=[$(this).parent().siblings(".checkOutItemName").children('p').html(),
    $(this).parent().siblings(".checkOutItemColor").children('p').html(),
    $(this).parent().siblings(".checkOutItemSize").children('p').html(),
    $(this).parent().siblings(".checkOutItemQuantity").children('p').html(),];
    removedCheckOutItem.push(removedItemsArray);

    for (let i=0; i<checkOutList.length; i++){
        totalItemQuantity += Number(checkOutList[i][3]);
    }
    for (let r = 0; r <removedCheckOutItem.length; r++){
        totalItemQuantity -= Number(removedCheckOutItem[r][3]);
    }
    $('.totalItemQuantity').html(`( ${totalItemQuantity} )`);
    totalItemQuantity = 0;


    $(this).parent().parent().parent().remove();
})
