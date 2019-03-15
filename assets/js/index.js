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

    initialze();
});

// Extension method za niz
Array.prototype.firstOrDefault = function(predicate)
{
    for(let i = 0; i < this.length; i++)
    {
        if(predicate(this[i]))
        {
            return this[i];
        }
    }

    if(this.length > 0)
    {
        return this[0];
    }

    return null;
}

var phones = [];
var manufacturers = [];
var cpus = [];
var gpus = [];
var systems = [];
var phoneimages = [];

function Phone(phone, manufacturer, primaryImage)
{
    this.name = manufacturer.name + phone.name;
    this.price = phone.price;
    this.primaryImage = primaryImage;
}

var phoneToDisplay = [];

function jsonAjax(path, callback)
{
    $.ajax({
        url: path,
        dataType: "json",
        type: "GET",
        success: callback
    });
}

function initialze()
{
    loadData(onDataLoaded);
    
    function onDataLoaded()
    {
        loadPhones();
        displayPhones();
    }
}

function displayPhones()
{
    let phonesHtml = "";

    for(phone of phoneToDisplay)
    {
        phonesHtml += displaySinglePhone(phone);
    }

    $("#recomended-items").html(phonesHtml);
}

function loadPhones()
{
    for(phone of phones)
    {
        let manufacturer = manufacturers.find(m => m.id == phone.manufacturerId);
        let phoneImages = phoneimages.find(i => i.id == phone.imagesId);
        let primaryImage = phoneImages.images[phoneImages.primary];

        phoneToDisplay.push(new Phone(phone, manufacturer, primaryImage));
    }

    console.log(phoneToDisplay);
}

function displaySinglePhone(phone)
{
    return `<div class="phone-item col-3">
                <div class="image-container">
                    <img src="${"assets/img/" + phone.primaryImage.src}" alt="${phone.primaryImage.alt}" />
                </div>
                <div class="phone-info">
                    <h3>${phone.name}</h3>
                    <div class="info">
                        <div>Price</div>
                        <div>${phone.price.new}$</div>
                        <div><strike>${phone.price.old}$</strike></div>
                    </div>
                </div>
                <div class="buy-button">
                    BUY NOW
                </div>
            </div>`;
}

function loadData(finishedCallback)
{
    var handler = new MultipleAjaxCompletedHandler(6, finishedCallback);

    // load phones
    jsonAjax("data/phones.json", function(data)
    {
        phones = data;
        handler.ajaxFinished();
    });

    // load manufacturers
    jsonAjax("data/manufacturers.json", function(data)
    {
        manufacturers = data;
        handler.ajaxFinished();
    });

    // load cpus
    jsonAjax("data/cpus.json", function(data)
    {
        cpus = data;
        handler.ajaxFinished();
    });

    // load gpus
    jsonAjax("data/gpus.json", function(data)
    {
        gpus = data;
        handler.ajaxFinished();
    });

    // load systems
    jsonAjax("data/systems.json", function(data)
    {
        systems = data;
        handler.ajaxFinished();
    });

    // load phoneimages
    jsonAjax("data/phoneimages.json", function(data)
    {
        phoneimages = data;
        handler.ajaxFinished();
    });
}

function MultipleAjaxCompletedHandler(number, onAllCompleted)
{
    this.ajaxCount = 0;
    this.numberOfCallsRequired = number;

    this.ajaxFinished = function()
    {
        this.ajaxCount += 1;

        if(this.ajaxCount == this.numberOfCallsRequired)
        {
            onAllCompleted();
        }
    }
}