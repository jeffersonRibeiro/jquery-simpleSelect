(function($){
    $.fn.simpleSelect = function(options){
        var optionsDefault = {
            terms: [],
            notFoundMessage: 'Não encontrado.',
            defaultSelected: 'Selecionar...'
        }

        options = $.extend(true, optionsDefault, options);

        var template = '<div class="simple-select">\
                            <div class="selected">'+ options.defaultSelected + '</div>\
                            <div class="simple-select-modal">\
                                <input type="text"/>\
                                <div class="simple-select-result"></div>\
                            </div>\
                        </div>';

        var $container = $(template);

        init(this);

        function init(el){

            $container.insertAfter(el);
            $container.prepend(el);

            buildSelect(options.terms);
        }

        function buildSelect(terms) {
            var selectOptions = '<option>' + options.defaultSelected + '</option>';
            for (var i = 0; i < terms.length; i++) {
                selectOptions += '<option value="' + terms[i] + '">' + terms[i] + '</option>';
            }
            $container.find('select').html(selectOptions);
        }

        function renderResults(termsFound) {
            var $resultContainer = $container.find('.simple-select-modal .simple-select-result');
            var template = '';
            if (!termsFound.length) {
                $resultContainer.html('<span class="not-found">' + options.notFoundMessage + '</span>');
                return false;
            }

            for (var i = 0; i < termsFound.length; i++) {
                template += '<span class="option-found">' + termsFound[i] + '</span>';
            }

            $resultContainer.html(template);
        }

        function searchTerm(q) {
            var terms = options.terms;
            var termsFound = [],
                regex = new RegExp(q.toUpperCase());

            for (var i = 0; i < terms.length; i++) {
                if (regex.test(terms[i].toUpperCase()))
                    termsFound.push(terms[i]);
            }

            return termsFound;
        }

        function select(term) {
            var $options = $container.find('select option');

            for (var i = 0; i < $options.length; i++) {
                if ($options[i].value === term) {
                    $($options[i]).prop('selected', true);
                    $container.find('.selected').text(term);
                    break;
                }
            }
        }


        /* Triggers */

        var $inputSearch = $container.find('.simple-select-modal input'),
            $selected = $container.find('.selected');

        $inputSearch.on('keyup', function (e) {
            renderResults(searchTerm(e.target.value));
        });

        $selected.on('click', function (e) {
            $inputSearch.val('');
            $container.addClass('modal-open');
            $inputSearch.focus();
        });

        $inputSearch.on('focus', function (e) {
            renderResults(searchTerm(e.target.value));
        });

        $inputSearch.on('focusout', function (e) {
            setTimeout(function () {
                $container.removeClass('modal-open');
            }, 150);
        });

        $(document).on('click', '.simple-select .option-found', function () {
            select($(this).text());
        });

    }

})(jQuery);