$(function()
{
    var emailRegex = /^\w+([\.-]\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    $(".email-txb, input[type=email]").on("keypress keydown keyup", function()
    {
        if (!$(this).val().match(emailRegex)) 
        {
            $(this).addClass('warning');
        }
        else
        {
            $(this).removeClass('warning');
        }
    });
});