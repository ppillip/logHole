LogHole = new Meteor.Collection('logHole');

Meteor.startup(function() {
    console.log('자시작','입니다');
/*
    WebApp.connectHandlers.use(function(req, res, next) {
        // add allow origin
        res.setHeader('Access-Control-Allow-Origin', '*');

        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

        // add headers
        res.setHeader('Access-Control-Allow-Headers', [
            'Accept',
            'Accept-Charset',
            'Accept-Encoding',
            'Accept-Language',
            'Accept-Datetime',
            'Authorization',
            'Cache-Control',
            'Connection',
            'Cookie',
            'Content-Length',
            'Content-MD5',
            'Content-Type',
            'Date',
            'User-Agent',
            'X-Requested-With',
            'Origin'
        ].join(', '));
    });

*/
});

RESTstop.configure({
    use_auth: false,
    api_path: 'api'
});

RESTstop.add('ange/uri/:uriText', function() {

    var uriText = __b64.decode(this.params.uriText);

    console.log('결과',uriText);

    this.response.setHeader('Access-Control-Allow-Origin', "*");
    this.response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    this.response.setHeader('Access-Control-Allow-Headers', ['Accept','Accept-Charset','Accept-Encoding','Accept-Language','Accept-Datetime'
                                                            ,'Authorization','Cache-Control','Connection','Cookie','Content-Length'
                                                            ,'Content-MD5','Content-Type','Date','User-Agent','X-Requested-With','Origin'].join(', '));
    try{
        var a = moment();
        LogHole.insert({
            u: uriText,                                 // 전체 url
            ymd: a.format('YYYYMMDD'),                  // 년월일
            h: a.format('HH'),                          // 시
            doy:a.format('e'),                          // 요일 일:0,월:1 ....
            i: uriText.split('//')[1].split('/')[0]     // 도메인만 걸러냄 ....
        });
    }catch(e){
        console.error(e);
    }
    return { r: 'ok' };
});