describe('Skuriken', function () {
    var x;
    beforeEach(function () {
        x = require('../index');
    });
    it('The module is defined', function () {
        expect(x).toBeDefined();
    });
    it('getNested returns nested property of object if it exists', function(){
        var expected = 'expected';
        var mock = {
            a: {
                b: {
                    c: {
                        d:{
                            e: expected
                        }
                    }
                }
            }
        };
        var actual = 'not-expected';
        actual = x.getNested(mock, ['a', 'b', 'c', 'd', 'e']);
        expect(x.getNested).toBeDefined();
        expect(actual).toBeDefined();
        expect(actual).toEqual(expected);
    });

    it('getNested returns nested property of object if it exists, for single string keys parameter', function(){
        var expected = 'expected';
        var mock = {
            a: {
                b: {
                    c: {
                        d:{
                            e: expected
                        }
                    }
                }
            }
        };
        var actual = 'not-expected';
        actual = x.getNested(mock, 'a.b.c.d.e');
        expect(actual).toBeDefined();
        expect(actual).toEqual(expected);
    });

    it('getNested returns undefined if nested property does not exist', function(){
        var mock = {
            a: {
                b: {
                    c: {
                        d:{
                            f: false
                        }
                    }
                }
            }
        };
        var actual = 'not-expected';
        actual = x.getNested(mock, ['a', 'b', 'c', 'd', 'e']);
        expect(actual).not.toBeDefined();
    });
    it('getNested returns alternative if the nested property does not exist, but alternative is provided', function(){
        var mock = {
            a: {
                b: {
                    c: {
                        d:{
                            f: false
                        }
                    }
                }
            }
        };
        var actual = 'actually-expected';
        var expected = actual;
        actual = x.getNested(mock, ['a', 'b', 'c', 'd', 'e'], actual);
        expect(actual).toBeDefined();
        expect(actual).toEqual(expected);
    });
    it('hasNested returns true when the object has a nested property, even if it evaluates to false', function(){
        var mock = {
            a: {
                b: {
                    c: {
                        d:{
                            e: false
                        }
                    }
                }
            }
        };
        var expected = true;
        var actual;
        actual = x.hasNested(mock, ['a', 'b', 'c', 'd', 'e']);
        expect(actual).toBeDefined();
        expect(actual).toEqual(expected);
    });
    it('hasNested returns true when the object has a nested property, even if it is undefined', function(){
        var mock = {
            a: {
                b: {
                    c: {
                        d:{
                            e: undefined
                        }
                    }
                }
            }
        };
        var expected = true;
        var actual;
        actual = x.hasNested(mock, ['a', 'b', 'c', 'd', 'e']);
        expect(actual).toBeDefined();
        expect(actual).toEqual(expected);
    });
    it('hasNested returns true when the object has a nested property, when keys are a single string', function(){
        var mock = {
            a: {
                b: {
                    c: {
                        d:{
                            e: 'has'
                        }
                    }
                }
            }
        };
        var expected = true;
        var actual;
        actual = x.hasNested(mock, 'a.b.c.d.e');
        expect(actual).toBeDefined();
        expect(actual).toEqual(expected);
    });
    it('hasNested returns false when the object has not the nested property', function(){
        var mock = {
            a: {
                b: {
                    c: {
                        d:{
                            f: 'has not'
                        }
                    }
                }
            }
        };
        var expected = false;
        var actual;
        actual = x.hasNested(mock, 'a.b.c.d.e');
        expect(actual).toBeDefined();
        expect(actual).toEqual(expected);
    });
});