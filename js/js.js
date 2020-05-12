$(document).ready(function(){
    var $context = $('body'),
        $navItems = $('#main-nav-menu li'),
        $activateItem = $('main-nav-menu li.active');

    
        function registerEventListeners() {

            // trigger for page transition
            $context.on('click', '.transition-link', function(e){
                e.preventDefault();

                var newURL = $(this).attr('href');
                pageChange(newURL);
            });

            //
            $(window).on('popstate', function(){
                var page = location.pathname.split('/').pop();
                pageChange(page);
            });
        }



        function pageChange(newURL) {

             // add animating class after click
            $context.addClass('animating');

            // Add timeout animating class 
            setTimeout(function(){
                loadNewPage(newURL);
            }, 1500);

        }



        function loadNewPage(newURL) {

            var container = $('<div id="newContainer"></div>');
            
                container.load(newURL, function(){

                // console.log(container);
                $('.page').html(container.find('.page > *'));

                //id for different page
                var pageid = container.find('[id^="page__"]').attr('id');
                $('[id^="page__"]').attr('id', pageid);

                // Changes web title 
                var newTitle = container.find('title')[0].text;
                $('title').html(newTitle);

                // Changes URL name
                window.history.pushState(null,'',newURL);

                // Add timeout animating class after leave page
                setTimeout(function(){
                    $context.removeClass('animating');
                }, 1000);

            })
        }

        registerEventListeners();
    
})