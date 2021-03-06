'use strict';

var conjoiners = require('../lib/conjoiners');
var config = 'test/conjoiner.conf.json';

exports['simple inter-process communication'] = function(test) {
    test.expect(3);

    var value = 'test_value';
    var cj1 = {};
    var cj1Name = 'test';
    var cj2 = {
        onTransenlightenment: function (event) {
            test.equal(event.property, 'val');
            test.equal(this[event.property], value);
            test.equal(cj2.val, value);
            test.done();
        }
    };

    conjoiners.implant(cj1, config, cj1Name).then(function() {
        return conjoiners.implant(cj2, 'test/conjoiner.conf.json', 'test2');
    }).then(function () {
        cj1.val = value;
    }).done();
};
