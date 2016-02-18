var APP = function(){

    var reservas = {};

    function createItem(hour){

        var item = $('<li class="list-group-item"></li>');
        item.attr("data-hour",hour);

        var row = $('<div class="row"></div>');

        var divHours = $('<div class="col-lg-6" class="actions"></div>');
        var p = $('<p class="hour">'+hour+'</p>');
        $(divHours).append(p);

        var divActions = $('<div class="col-lg-6" class="actions"></div>');

        function buildBtn(text,classList){
            var btn = $('<button class="btn">'+text+'</button>');
            $(btn).addClass(classList);
            return btn;
        }

        var reserve = $(buildBtn("Reservar","reservar"));
        $(reserve).addClass("btn-success");
        reserve.attr("data-hour",hour);

        $(reserve).click(function(){
            APP.reservar( $(this) );
        });


        $(divActions).append($(reserve));

        var cancel = $(buildBtn("Cancelar","cancel"));
        cancel.attr("data-hour",hour);
        $(cancel).addClass("btn-danger ");

        $(cancel).click(function(){
            APP.cancelar( $(this) );
        });

        $(cancel).hide();
        $(divActions).append($(cancel));

        $(row).append(divHours);
        $(row).append(divActions);

        $(item).append(row);
        $("#hoursList").append(item);
    }

    function crearHoras(){
        for(var i = 9; i < 23; i++){
            createItem(i+":00");
            createItem(i+":30");
            reservas[i+":00"] = { reservado: false };
            reservas[i+":30"] = { reservado: false };
        }
    }

    crearHoras();

    return {
        reservar:function(elem){
            var data = $(elem).data();
            var hour = data.hour;
            if(!reservas[hour].reservado){
                reservas[hour] = {
                    reservado:true
                };
                $('li[data-hour="'+hour+'"]').addClass("active");
                $('li[data-hour="'+hour+'"] .reservar').hide();
                $('li[data-hour="'+hour+'"] .cancel').show();
            }
        },
        cancelar:function(elem){
            var data = $(elem).data();
            var hour = data.hour;
            if(reservas[hour].reservado){
                reservas[hour] = {
                    reservado:false
                };
                $('li[data-hour="'+hour+'"]').removeClass("active");
                $('li[data-hour="'+hour+'"] .reservar').show();
                $('li[data-hour="'+hour+'"] .cancel').hide();
            }
        }
    }
}

window.APP = new APP();