function base64_decode (data) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = "",
        tmp_arr = [];

    if (!data) {
        return data;
    }

    data += '';

    do { // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);

    dec = tmp_arr.join('');

    return dec;
}

jQuery(function() {
	var code = (window.location.search.substring(1));
	var person = '';
	var cause = '';

	if (code.indexOf('done=') !== -1 && code !== 'done=true')
	{
		var thecode = (decodeURIComponent(code.replace('done=', '')));
		var c = (base64_decode(thecode));
		var res = jQuery.parseJSON(c);
		person = res['name'];
		cause = res['cause'];
	}

	jQuery.fn.dsRobocallsDone(person, cause);

    var obj = {
        method: 'feed',
        link: 'http://www.dosomething.org/causecall',
        name: 'DoSomething Cause Calls',
        description: 'Awesome.  I just had ' + person + 'call my friend to say "Do Something about ' + cause + '"'
      };

      jQuery('#robocalls-fb-share-link').click(function () {
        FB.ui(obj);
        return false;
      });
});
