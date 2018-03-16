/**
 * simple-select - Plugin Jquery para criar elementos select com opção de search
 * @version v1.0.0
 * @link https://github.com/jeffersonRibeiro/simpleSelect#readme
 * @license ISC
 */
(function($){
    $.fn.simpleSelect = function(options){
        var that = this;
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

        init();

        function init(){

            $container.insertAfter(that);
            $container.prepend(that);

            buildSelect(options.terms);
        }

        function buildSelect(terms) {
            var selectOptions = '<option value="">' + options.defaultSelected + '</option>';

            /* 
                Se não foi passado termos e tem elementos
                <option> dentro do select, montar os termos
                a partir dos childs do <select>
            */
            var $childs = that.find('option');
            if (!options.terms.length && !!$childs.length) {
                for (var i = 0; i < $childs.length; i++) {
                    if ($childs[i].hasAttribute('data-defaultSelected') )
                        continue;

                    options.terms.push($childs[i].innerText);
                }
                selectOptions = '<option value="">' + $childs[0].innerText + '</option>'
                $container.find('.selected').text($childs[0].innerText);
            }

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
                    $container.find('select').change();
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