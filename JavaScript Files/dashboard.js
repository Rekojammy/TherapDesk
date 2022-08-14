
$('#menuBtn').click(function () {
    // toggle the name attribute of the child element of the menuBtn
    $('#menuIcon').attr('name', function (i, val) {
        return val == 'menu' ? 'x' : 'menu';
    });

    $('#menu').slideToggle('slow');
});



// ======================== For Large Screen ========================
$(document).ready(function () {
    $("#sideBtn").click(function () {
        $("#side-bar").animate({ width: 'toggle', opacity: 'toggle' }, "slow");
    });

    $('#profilePic').click(function () {
        $('#profileMenu').animate({ opacity: 'toggle' }, "slow");
    });

    $('#all').addClass('text-white border-b-2 border-red-400 font-bold');
    $('#notifTab p').click(function () {
        $('#notifTab p').removeClass('text-white border-b-2 border-red-400 font-bold' );
        $(this).addClass('text-white border-b-2 border-red-400 font-bold');
    });

    $('#notifBtnLg').click(function () {
        $('#notifcations').slideToggle('slow');
    });
});