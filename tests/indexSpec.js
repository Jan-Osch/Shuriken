describe('reachDeep', function () {
    var reach;
    beforeEach(function () {
        reach = require('../src/index');
    });
    it('The module is defined, exports are properly defined', function () {
        expect(reach).toBeDefined();
        expect(reach).toEqual(jasmine.any(Function));
    });
    it('returns nested property of object if it exists', function () {
        var expected = 'expected';
        var mock = {
            a: {
                b: {
                    c: {
                        d: {
                            e: expected
                        }
                    }
                }
            }
        };
        var actual = reach(mock, 'a.b.c.d.e');
        expect(actual).toBeDefined();
        expect(actual).toEqual(expected);
    });

    it('returns a nested property, even if it evaluates to false', function () {
        var mock = {
            a: {
                b: {
                    c: {
                        d: {
                            e: false
                        }
                    }
                }
            }
        };
        var actual = reach(mock, 'a.b.c.d.e');
        expect(actual).toBeDefined();
        expect(actual).toEqual(false);
    });

    it('returns a nested property when path contains array index, object property access and function calls', function () {
        const expected = 'expected';
        var mock = {
            a: function () {
                return {
                    b: {
                        c: [
                            {},
                            {
                                "d": {
                                    e: expected
                                }
                            }
                        ]
                    }
                }
            }
        };
        var actual = reach(mock, 'a().b.c[1]["d"].e');
        expect(actual).toBeDefined();
        expect(actual).toEqual(expected);
    });

    it('if nested property does not exist, and sourceName is provided it will log error to console with proper name', function () {
        const expected = 'expected';
        var mock = {
            a: {}
        };
        spyOn(console, 'log');
        reach(mock, 'a().b.c[1]["d"].e', 'mock');
        expect(console.log).toHaveBeenCalledWith(new TypeError('mock.a is not a function'));
    });

});