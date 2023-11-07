setRating = function ( a,b,d ) {
    if( a > 0 && b > 0 ) { 
        var r = parseFloat ( a * b ), t = parseInt ( b ), m = 0, p = 0, s = 0, g = 3,       
        z = function ( n ) {
            var t = parseInt ( n );
            return t < n ?++t:t
        };       
        for ( i=0, j = r/g; i <= j && i <= t; i++ ) {
            p = i,
            m = t - p,
            s = p * g + m,
            k = r / s;
            if ( s >=r ) {
                p = p*k;
                m = m*k;
                break
            }
        }
        $('#plus_' + d).html( z ( p ) ),
        $('#minus_' + d).html( z ( m ) ) 
    }
};
getRate = function (c, d, f, g) {
    if (typeof d == 'undefined' || typeof c == 'undefined' || (c != 1 && c != -1)) return false;
    c = (c == 1 ? 3 : 1);
    if (!f) f = location.pathname.match(/[^\\\/]+/i) + '';
    if (!f) return false;
    var h = $('#rate_' + d);
    g = $.extend({
        'before': function (a) {
            a.prev('a').remove();
            a.next('a').remove()
        },
        'after-success': function (b) {
            h.html(b).addClass(b > 0 ? 'positiveRate' : (b == 0 ? 'nullRate' : 'negativeRate'));
            _uWnd.alert('Оценка засчитана!')
        },
        'after-error': function (a) {
            try {
                eval(a)
            } catch (e) {}
        }
    }, g || {});
    g.before(h);
    $.post('/' + f + '/', {
        'a': '65',
        'id': d,
        'mark': c,
        'mod': f,
        'ajax': '2'
    }, function (a) {
        a = $('cmd:first', a).text();
        var b = a.match(/Рейтинг:\s*([\d.]+)\/(\d+)/i);
        if (!b) return g['after-error'](a);
        setRating(b[1], b[2], d);
        b = Math.round(b[1] * b[2]) - 2 * b[2];
        g['after-success'](b)
    })
};