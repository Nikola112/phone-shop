$(function()
{
    function PhoneImage(name, imageSource)
    {
        this.name = name;
        this.source = imageSource;

        this.renderPhoneImage = function(imageDir)
        {
            return `<div class="phone-gallery-item">
                        <img src="${imageDir + this.source}" alt="${this.name}" />
                    </div>`;
        }
    }

    let phoneImages = [
        new PhoneImage("Huawei Mate 20 Pro", "huawei-mate-20-pro.jpg"),
        new PhoneImage("Huawei Honor Play", "huawei-honor-play.jpg"),
        new PhoneImage("IPhone X", "iphone-x.jpg"),
        new PhoneImage("IPhone XR", "iphone-xr.jpg"),
        new PhoneImage("Samsung Galaxy A6", "samsung-galaxy-a6.jpg"),
        new PhoneImage("Samsung Galaxy S9+", "samsung-galaxy-s9-plus.jpg"),
        new PhoneImage("Sony Xperia L1", "sony-xperia-l1.jpg"),
        new PhoneImage("Sony Xperia XA2", "sony-xperia-xa-2.jpg"),
        new PhoneImage("Sony Xperia XZ2", "sony-xperia-xz-2.jpg"),
        new PhoneImage("Nokia 7.1", "nokia-7-1.jpg"),
        new PhoneImage("Nokia 8", "nokia-8.jpg"),
        new PhoneImage("Nokia 5", "nokia-5.jpg"),
        new PhoneImage("Samsung Galaxy A9", "samusng-galaxy-a9.jpg"),
        new PhoneImage("Huawei P20 Lite", "huawei-p20-lite.jpg"),
        new PhoneImage("Nokia 6.1", "nokia-6-1.jpg"),
        new PhoneImage("Motorola Moto Z", "motorola-moto-z.jpg")
    ];

    let phoneGallery = document.getElementById("phone-gallery");
    let phoneGalleryHtml = "";

    for(let i = 0; i < phoneImages.length; i++)
    {
        phoneGalleryHtml += phoneImages[i].renderPhoneImage("../assets/img/");
    }

    phoneGallery.innerHTML = phoneGalleryHtml;

    let $choosenOne = $("#choose-phone");

    $(document).on("click", ".phone-gallery-item", function()
    {
        console.log($(this).find("img").attr("src"));

        let $image = $(this).find("img");
        $choosenOne.html(`  <h2>${$image.attr("alt")}</h2>
                            <img src="${$image.attr("src")}" alt="${$image.attr("alt")}" />`);
        
        $('html, body').animate({scrollTop : 0}, 200);
    });
});