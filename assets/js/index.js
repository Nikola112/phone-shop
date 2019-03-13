$(function()
{
    "use strict"

    // this will always be 3 more days
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 3);

    $("#best-deal-countdown .text").countdown(expireDate, function(event) 
    {
        $(this).text(event.strftime('%I:%M:%S'));
    });

    function Phone(name, price, imageSourceName) 
    {
        this.name = name;
        this.price = price;
        this.imageSourceName = imageSourceName;
        
        this.toPhoneItem = function(imagesDir)
        {
            return `<div class="phone-item col-3">
                        <div class="image-container">
                            <img src="${imagesDir + this.imageSourceName}" alt="${this.name}" />
                        </div>
                        <div class="phone-info">
                            <h3>${this.name}</h3>
                            <div class="info">
                                <div>Price</div>
                                <div>${this.price}$</div>
                            </div>
                        </div>
                        <div class="buy-button">
                            BUY NOW
                        </div>
                    </div>`;
        };
    }
    
    function PhoneList(phones) 
    {
        this.phones = phones;
    
        this.getPhoneByName = function(name) 
        {
            for (let phone in phones) 
            {
                if (phone.name == name) 
                {
                    return phone;
                }
            }
        }

        this.atIndex = function(index) 
        {
            return phones[index];
        }
    }
    
    function phoneListToPhoneItems(imagesDir, phoneItems)
        {
            let s_phoneItems = "";

            for(let i = 0; i < phoneItems.length; i++)
            {
                s_phoneItems += phoneItems[i].toPhoneItem(imagesDir);
            }
    
            return s_phoneItems;
        }
    
    let phones = [
        new Phone("Huawei Mate 20 Pro", 899.99, "huawei-mate-20-pro.jpg"),
        new Phone("Huawei Honor Play", 349.99, "huawei-honor-play.jpg"),
        new Phone("IPhone X", 1024.99, "iphone-x.jpg"),
        new Phone("IPhone XR", 849.99, "iphone-xr.jpg"),
        new Phone("Samsung Galaxy A6", 249.99, "samsung-galaxy-a6.jpg"),
        new Phone("Samsung Galaxy S9+", 949.99, "samsung-galaxy-s9-plus.jpg"),
        new Phone("Sony Xperia L1", 229.99, "sony-xperia-l1.jpg"),
        new Phone("Sony Xperia XA2", 329.99, "sony-xperia-xa-2.jpg"),
        new Phone("Sony Xperia XZ2", 289.99, "sony-xperia-xz-2.jpg"),
        new Phone("Nokia 7.1", 459.99, "nokia-7-1.jpg"),
        new Phone("Nokia 8", 505.89, "nokia-8.jpg")
    ];
    
    function renderPhoneItems(parent, ...items)
    {
        parent.innerHTML = phoneListToPhoneItems("assets/img/", items);
    }

    let phoneList = new PhoneList(phones);

    let recomended = document.getElementById("recomended-items");
    renderPhoneItems(recomended, phoneList.atIndex(0), phoneList.atIndex(10), phoneList.atIndex(8), phoneList.atIndex(3));

    let featured = document.getElementById("featured-items");
    renderPhoneItems(featured, phoneList.atIndex(4), phoneList.atIndex(6), phoneList.atIndex(7), phoneList.atIndex(2));

    let newest = document.getElementById("newest-items");
    renderPhoneItems(newest, phoneList.atIndex(5), phoneList.atIndex(0), phoneList.atIndex(8), phoneList.atIndex(9));
});