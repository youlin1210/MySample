$(document).ready(function() {
    
    /************* 跑馬燈 *************/ 
    $(function() {
        $('.carousel').carousel({
            interval: 3000
        })
    });


    /************* 選單 *************/ 
    $(function() {
        $('.dropdown').hover(function() {
                $(this).addClass('open');
            },
            function() {
                $(this).removeClass('open');
            });
    });


    /************* 回到上面 *************/ 
    if ($('#back-to-top').length) {
        var scrollTrigger = 500, // px
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
        });
        $('#back-to-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

    /************* 圖片選取 *************/
    $(function() {
        $('.QuickLink-area ul li img').each(function() {
            var _hover_img = $(this).attr('data-hover');
            var _out_img = $(this).attr('src');

            $(this).hover(function() {
                $(this).attr('src', jCom.urlPath()+ _hover_img);
            }, function() {
                $(this).attr('src', _out_img);
            });
        });
    });

     /************* 時間設定 *************/
    $('#datepicker-end-time').attr('disabled');
    $("#datepicker-start-time").datepicker({
        dateFormat: "yy-mm-dd",
        changeYear: true,
        minDate: 0,
        onSelect: function () {
            var dt2 = $('#datepicker-end-time');
            var startDate = $(this).datepicker('getDate');
            //add 30 days to selected date
            startDate.setDate(startDate.getDate() + 365);
            var minDate = $(this).datepicker('getDate');

            //same for dt1
            $(this).datepicker('option', 'minDate', minDate);

            dt2.val($(this).val());
            dt2.removeAttr('disabled');
            dt2.datepicker({
                dateFormat: "yy-mm-dd",
                maxDate: startDate,
                minDate: minDate
            });
        }
    });     
});

/************* 小測驗 *************/
$(document).ready(function() {
    $('.option-a, .option-b, .option-c').hide();

    $("input[name='option']").click(function () {
        $('.option-a').css('display', ($(this).val() === 'a') ? 'block':'none');
    });

    $("input[name='option']").click(function () {
        $('.option-b').css('display', ($(this).val() === 'b') ? 'block':'none');
    });

    $("input[name='option']").click(function () {
        $('.option-c').css('display', ($(this).val() === 'c') ? 'block':'none');
    });
    /************* 基金警語 *************/
    $('#WarningBtn').on('click', function (e) {
        var self = $(this);
        var i = self.find('i');
        if (i.hasClass('fa-minus')) {
            i.removeClass('fa-minus').addClass('fa-plus');
        } else {
            i.removeClass('fa-plus').addClass('fa-minus');
        }
    });
});