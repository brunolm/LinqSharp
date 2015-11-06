"use strict";

var _linqsharp = require("./linqsharp");

var _linqsharp2 = _interopRequireDefault(_linqsharp);

var _assertsharp = require("assertsharp");

var _assertsharp2 = _interopRequireDefault(_assertsharp);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function assert(expected, actual) {
    var errorMessage = arguments.length <= 2 || arguments[2] === undefined ? "Test fail" : arguments[2];

    if (expected != actual) throw new Error(errorMessage);
}
describe("linqsharp", function () {
    it("Aggregate", function () {
        _assertsharp2.default.AreEqual(106, new _linqsharp2.default([3, 100, 1, 2]).Aggregate(function (a, b) {
            return a + b;
        }));
    });
    it("All", function () {
        _assertsharp2.default.IsTrue(new _linqsharp2.default([3, 100, 1, 2]).All(function (i) {
            return i > 0;
        }));
    });
    it("Any", function () {
        _assertsharp2.default.IsTrue(new _linqsharp2.default([3, 100, 1, 2]).Any(function (i) {
            return i == 1;
        }));
    });
    it("Average", function () {
        _assertsharp2.default.AreEqual((3 + 100 + 1 + 2) / 4, new _linqsharp2.default([3, 100, 1, 2]).Average());
        _assertsharp2.default.AreEqual((3 + 100 + 1 + 2) / 4, new _linqsharp2.default([{ Value: 3 }, { Value: 100 }, { Value: 1 }, { Value: 2 }]).Average(function (o) {
            return o.Value;
        }));
    });
    it("Concat", function () {
        var expected = [1, 2, 3, 4];
        var actual = new _linqsharp2.default([1, 2]).Concat([3, 4]).ToArray();
        _assertsharp2.default.AreEqual(expected.length, actual.length);
        _assertsharp2.default.AreEqual(expected[0], actual[0]);
        _assertsharp2.default.AreEqual(expected[1], actual[1]);
        _assertsharp2.default.AreEqual(expected[2], actual[2]);
        _assertsharp2.default.AreEqual(expected[3], actual[3]);
    });
    it("Contains", function () {
        _assertsharp2.default.IsTrue(new _linqsharp2.default([1, 2, 3]).Contains(2));
        _assertsharp2.default.IsFalse(new _linqsharp2.default([1, 2, 3]).Contains(20));
        var comparer = {
            Equals: function Equals(x, y) {
                return x == y;
            },
            GetHashCode: function GetHashCode(obj) {
                return obj;
            }
        };
        _assertsharp2.default.IsTrue(new _linqsharp2.default([1, 2, 3]).Contains(2, comparer));
        _assertsharp2.default.IsFalse(new _linqsharp2.default([1, 2, 3]).Contains(20, comparer));
    });
    it("Count", function () {
        _assertsharp2.default.AreEqual(4, new _linqsharp2.default([1, 2, 3, 5]).Count());
        _assertsharp2.default.AreEqual(2, new _linqsharp2.default([1, 2, 3, 5]).Count(function (o) {
            return o <= 2;
        }));
    });
    it("Distinct", function () {
        var expected = [1, 2];
        var actual = new _linqsharp2.default([1, 1, 2, 2]).Distinct().ToArray();
        _assertsharp2.default.AreEqual(expected.length, actual.length);
        _assertsharp2.default.AreEqual(expected[0], actual[0]);
        _assertsharp2.default.AreEqual(expected[1], actual[1]);
        var comparer = {
            Equals: function Equals(x, y) {
                return x == y;
            },
            GetHashCode: function GetHashCode(obj) {
                return obj;
            }
        };
        actual = new _linqsharp2.default([1, 1, 2, 2]).Distinct(comparer).ToArray();
        _assertsharp2.default.AreEqual(expected.length, actual.length);
        _assertsharp2.default.AreEqual(expected[0], actual[0]);
        _assertsharp2.default.AreEqual(expected[1], actual[1]);
    });
    it("DistinctBy", function () {
        var expected = [{ Value: 1 }, { Value: 2 }];
        var actual = new _linqsharp2.default([{ Value: 1 }, { Value: 2 }, { Value: 1 }]).DistinctBy(function (o) {
            return o.Value;
        }).ToArray();
        _assertsharp2.default.AreEqual(expected.length, actual.length);
        _assertsharp2.default.AreEqual(expected[0].Value, actual[0].Value);
        _assertsharp2.default.AreEqual(expected[1].Value, actual[1].Value);
        var comparer = {
            Equals: function Equals(x, y) {
                return x.Value == y.Value;
            },
            GetHashCode: function GetHashCode(obj) {
                return obj.Value;
            }
        };
        actual = new _linqsharp2.default([{ Value: 1 }, { Value: 2 }, { Value: 1 }]).DistinctBy(function (o) {
            return o;
        }, comparer).ToArray();
        _assertsharp2.default.AreEqual(expected.length, actual.length);
        _assertsharp2.default.AreEqual(expected[0].Value, actual[0].Value);
        _assertsharp2.default.AreEqual(expected[1].Value, actual[1].Value);
    });
    it("ElementAt", function () {
        _assertsharp2.default.AreEqual(5, new _linqsharp2.default([1, 2, 5, 4]).ElementAt(2));
        _assertsharp2.default.Throws(function () {
            return new _linqsharp2.default([1]).ElementAt(-1);
        });
        _assertsharp2.default.Throws(function () {
            return new _linqsharp2.default([1]).ElementAt(1);
        });
    });
    it("ElementAtOrDefault", function () {
        _assertsharp2.default.AreEqual(10, new _linqsharp2.default([1, 2, 3]).ElementAtOrDefault(100, 10));
        _assertsharp2.default.AreEqual(2, new _linqsharp2.default([1, 2]).ElementAtOrDefault(1, 10));
    });
    it("Except", function () {
        var expected = [1, 2];
        var actual = new _linqsharp2.default([1, 2, 3, 4]).Except([3, 4]).ToArray();
        _assertsharp2.default.AreEqual(expected.length, actual.length, "without comparer");
        _assertsharp2.default.AreEqual(expected[0], actual[0]);
        _assertsharp2.default.AreEqual(expected[1], actual[1]);
        var comparer = {
            Equals: function Equals(x, y) {
                return x.Value == y.Value;
            },
            GetHashCode: function GetHashCode(obj) {
                return obj.Value;
            }
        };
        expected = [{ Value: 1 }, { Value: 2 }];
        actual = new _linqsharp2.default([{ Value: 1 }, { Value: 2 }, { Value: 3 }, { Value: 4 }]).Except([{ Value: 3 }, { Value: 4 }], comparer).ToArray();
        _assertsharp2.default.AreEqual(expected.length, actual.length, "with comparer");
        _assertsharp2.default.AreEqual(expected[0].Value, actual[0].Value);
        _assertsharp2.default.AreEqual(expected[1].Value, actual[1].Value);
    });
    it("First", function () {
        _assertsharp2.default.AreEqual(1, new _linqsharp2.default([1, 2, 3]).First());
        _assertsharp2.default.Throws(function () {
            return new _linqsharp2.default([]).First();
        });
        _assertsharp2.default.AreEqual(2, new _linqsharp2.default([1, 2, 3]).First(function (o) {
            return o == 2;
        }));
        _assertsharp2.default.Throws(function () {
            return new _linqsharp2.default([1, 2]).First(function (o) {
                return o == 3;
            });
        });
    });
    it("FirstOrDefault", function () {
        _assertsharp2.default.AreEqual(1, new _linqsharp2.default([1, 2, 3]).FirstOrDefault());
        _assertsharp2.default.AreEqual(10, new _linqsharp2.default([]).FirstOrDefault(null, 10));
        _assertsharp2.default.AreEqual(3, new _linqsharp2.default([1, 2, 3]).FirstOrDefault(function (o) {
            return o == 3;
        }));
        _assertsharp2.default.AreEqual(10, new _linqsharp2.default([1, 2, 3]).FirstOrDefault(function (o) {
            return o == 11;
        }, 10));
    });
    it("ForEach", function () {
        var actual = 1;
        new _linqsharp2.default([1, 2, 3]).ForEach(function (i) {
            return actual *= i;
        });
        _assertsharp2.default.AreEqual(6, actual);
        actual = 1;
        new _linqsharp2.default([1, 2, 10, 110, 1110]).ForEach(function (i) {
            if (i > 2) return false;actual *= i;
        });
        _assertsharp2.default.AreEqual(2, actual);
    });
    it("GroupBy", function () {
        var actual = new _linqsharp2.default([{ Key: 1, Value: 2 }, { Key: 1, Value: 3 }]).GroupBy(function (o) {
            return o.Key;
        });
        _assertsharp2.default.AreEqual(1, actual.Count());
        _assertsharp2.default.AreEqual(2, actual.ElementAt(0).Elements.length);
    });
    it("IndexOf", function () {
        _assertsharp2.default.AreEqual(2, new _linqsharp2.default([0, 2, 1]).IndexOf(1));
        _assertsharp2.default.AreEqual(-1, new _linqsharp2.default([0, 2, 1]).IndexOf(100));
        _assertsharp2.default.AreEqual(-1, new _linqsharp2.default([]).IndexOf(0));
        _assertsharp2.default.AreEqual(-1, new _linqsharp2.default([]).IndexOf(undefined));
        _assertsharp2.default.AreEqual(-1, new _linqsharp2.default([]).IndexOf(null));
    });
    it("Intersect", function () {
        _assertsharp2.default.AreSequenceEqual([1, 2, 3], new _linqsharp2.default([1, 2, 3, 4, 5]).Intersect([1, 2, 3]).ToArray(), function (x, y) {
            return x == y;
        });
        var comparer = {
            Equals: function Equals(x, y) {
                return x.Value == y.Value;
            },
            GetHashCode: function GetHashCode(obj) {
                return obj.Value;
            }
        };
        _assertsharp2.default.AreSequenceEqual([{ Value: 1 }, { Value: 3 }], new _linqsharp2.default([{ Value: 1 }, { Value: 3 }, { Value: 2 }]).Intersect([{ Value: 1 }, { Value: 3 }], comparer).ToArray(), function (x, y) {
            return x.Value == y.Value;
        });
    });
    it("Join", function () {
        var joinedSimple = new _linqsharp2.default([1]).Join([1], function (o) {
            return o;
        }, function (i) {
            return i;
        }, function (o, i) {
            return { Outer: o, Inner: i };
        });
        _assertsharp2.default.AreEqual(1, joinedSimple.Count(), "Element count is wrong.");
        _assertsharp2.default.AreEqual(1, joinedSimple.First().Outer);
        _assertsharp2.default.AreEqual(1, joinedSimple.First().Inner);
        var joined = new _linqsharp2.default([{ ID: 1, Value: 1 }]).Join([{ ID: 1, Value: 2 }], function (o) {
            return o;
        }, function (i) {
            return i;
        }, function (o, i) {
            return { Outer: o.Value, Inner: i.Value };
        }, {
            Equals: function Equals(x, y) {
                return x.ID == y.ID;
            },
            GetHashCode: function GetHashCode(obj) {
                return obj.ID;
            }
        });
        _assertsharp2.default.AreEqual(1, joined.Count(), "Element count with comparer is wrong.");
        _assertsharp2.default.AreEqual(1, joined.First().Outer);
        _assertsharp2.default.AreEqual(2, joined.First().Inner);
    });
    it("Last", function () {
        _assertsharp2.default.AreEqual(1, new _linqsharp2.default([3, 4, 1]).Last());
        _assertsharp2.default.AreEqual(4, new _linqsharp2.default([3, 4, 1]).Last(function (o) {
            return o > 1;
        }));
        _assertsharp2.default.Throws(function () {
            return new _linqsharp2.default([]).Last();
        });
        _assertsharp2.default.Throws(function () {
            return new _linqsharp2.default([3, 4, 1]).Last(function (o) {
                return o > 100;
            });
        });
    });
    it("LastOrDefault", function () {
        _assertsharp2.default.AreEqual(1, new _linqsharp2.default([3, 4, 1]).Last());
        _assertsharp2.default.AreEqual(4, new _linqsharp2.default([3, 4, 1]).Last(function (o) {
            return o > 1;
        }));
        _assertsharp2.default.AreEqual(100, new _linqsharp2.default([]).LastOrDefault(null, 100));
        _assertsharp2.default.AreEqual(100, new _linqsharp2.default([3, 4, 1]).LastOrDefault(function (o) {
            return o > 100;
        }, 100));
    });
    it("Max", function () {
        _assertsharp2.default.AreEqual(10, new _linqsharp2.default([5, 7, 2, 10]).Max());
        _assertsharp2.default.AreEqual(10, new _linqsharp2.default([{ Value: 10 }, { Value: 7 }]).Max(function (o) {
            return o.Value;
        }));
        _assertsharp2.default.Throws(function () {
            return new _linqsharp2.default([]).Max();
        });
    });
    it("Min", function () {
        _assertsharp2.default.AreEqual(2, new _linqsharp2.default([5, 7, 2, 10]).Min());
        _assertsharp2.default.AreEqual(7, new _linqsharp2.default([{ Value: 10 }, { Value: 7 }]).Min(function (o) {
            return o.Value;
        }));
        _assertsharp2.default.Throws(function () {
            return new _linqsharp2.default([]).Min();
        });
    });
    it("OrderBy", function () {
        _assertsharp2.default.AreSequenceEqual([1, 2, 3], new _linqsharp2.default([3, 1, 2]).OrderBy(function (o) {
            return o;
        }).ToArray(), null, "Failed to order");
        _assertsharp2.default.AreSequenceEqual([{ Value: 1 }, { Value: 2 }], new _linqsharp2.default([{ Value: 2 }, { Value: 1 }]).OrderBy(function (o) {
            return o.Value;
        }).ToArray(), function (a, b) {
            return a.Value == b.Value;
        }, "Failed to order objects");
        _assertsharp2.default.AreSequenceEqual([{ Value: 2 }, { Value: 1 }], new _linqsharp2.default([{ Value: 1 }, { Value: 2 }]).OrderBy(function (o) {
            return o.Value;
        }, function (a, b) {
            return b - a;
        }).ToArray(), function (a, b) {
            return a.Value == b.Value;
        }, "Failed to order object with comparer");
        _assertsharp2.default.AreSequenceEqual([], new _linqsharp2.default([]).OrderBy(function (o) {
            return o;
        }).ToArray(), null, "Failed to order empty arrays");
        _assertsharp2.default.AreSequenceEqual(["a", "b", "c"], new _linqsharp2.default(["c", "a", "b"]).OrderBy(function (o) {
            return o;
        }).ToArray());
        _assertsharp2.default.AreEqual("a", new _linqsharp2.default([{ Title: "b", Message: "b" }, { Title: "c", Message: "c" }, { Title: "a", Message: "a" }]).OrderBy(function (o) {
            return o.Title;
        }).First().Title);
    });
    it("OrderByDescending", function () {
        _assertsharp2.default.AreSequenceEqual([3, 2, 1], new _linqsharp2.default([3, 1, 2]).OrderByDescending(function (o) {
            return o;
        }).ToArray(), null, "Failed to order");
        _assertsharp2.default.AreSequenceEqual([{ Value: 2 }, { Value: 1 }], new _linqsharp2.default([{ Value: 1 }, { Value: 2 }]).OrderByDescending(function (o) {
            return o.Value;
        }).ToArray(), function (a, b) {
            return a.Value == b.Value;
        }, "Failed to order objects");
        _assertsharp2.default.AreSequenceEqual([{ Value: 1 }, { Value: 2 }], new _linqsharp2.default([{ Value: 2 }, { Value: 1 }]).OrderByDescending(function (o) {
            return o.Value;
        }, function (a, b) {
            return b - a;
        }).ToArray(), function (a, b) {
            return a.Value == b.Value;
        }, "Failed to order object with comparer");
        _assertsharp2.default.AreSequenceEqual([], new _linqsharp2.default([]).OrderByDescending(function (o) {
            return o;
        }).ToArray(), null, "Failed to order empty arrays");
    });
    it("Reverse", function () {
        _assertsharp2.default.AreSequenceEqual([], new _linqsharp2.default([]).Reverse().ToArray(), null, "Failed to reverse empty arrays");
        _assertsharp2.default.AreSequenceEqual([2, 1], new _linqsharp2.default([1, 2]).Reverse().ToArray(), null, "Failed to reverse even arrays");
        _assertsharp2.default.AreSequenceEqual([3, 2, 1], new _linqsharp2.default([1, 2, 3]).Reverse().ToArray(), null, "Failed to reverse odd arrays");
        _assertsharp2.default.AreSequenceEqual([{ Value: 1 }, { Value: 2 }], new _linqsharp2.default([{ Value: 2 }, { Value: 1 }]).Reverse().ToArray(), function (a, b) {
            return a.Value == b.Value;
        }, "Failed to reverse object arrays");
    });
    it("Select", function () {
        _assertsharp2.default.AreSequenceEqual([1, 2, 3], new _linqsharp2.default([{ Value: 1 }, { Value: 2 }, { Value: 3 }]).Select(function (o) {
            return o.Value;
        }).ToArray());
    });
    it("SelectMany", function () {
        _assertsharp2.default.AreSequenceEqual([], new _linqsharp2.default([]).SelectMany(function (o) {
            return o;
        }).ToArray());
        _assertsharp2.default.AreSequenceEqual([1, 2, 3, 4, 5, 6], new _linqsharp2.default([[1, 2, 3], [4, 5, 6]]).SelectMany(function (o) {
            return o;
        }).ToArray());
        _assertsharp2.default.AreSequenceEqual([1, 2, 3, 4], new _linqsharp2.default([{ Values: [1, 2] }, { Values: [3, 4] }]).SelectMany(function (o) {
            return o.Values;
        }).ToArray());
        _assertsharp2.default.AreSequenceEqual([10, 20, 30, 40], new _linqsharp2.default([{ Values: [1, 2] }, { Values: [3, 4] }]).SelectMany(function (o) {
            return o.Values;
        }, function (o) {
            return o * 10;
        }).ToArray());
    });
    it("SequenceEqual", function () {
        _assertsharp2.default.Throws(function () {
            return new _linqsharp2.default([]).SequenceEqual(null);
        });
        _assertsharp2.default.IsTrue(new _linqsharp2.default([1, 2]).SequenceEqual([1, 2]));
        _assertsharp2.default.IsFalse(new _linqsharp2.default([1, 2]).SequenceEqual([1, 2, 3]));
        _assertsharp2.default.IsFalse(new _linqsharp2.default([1, 2]).SequenceEqual([2, 1]));
    });
    it("Single", function () {
        _assertsharp2.default.Throws(function () {
            return new _linqsharp2.default([1, 2]).Single();
        });
        _assertsharp2.default.Throws(function () {
            return new _linqsharp2.default([1, 2, 3, 4]).Single(function (o) {
                return o < 3;
            });
        });
        _assertsharp2.default.AreEqual(1, new _linqsharp2.default([1]).Single());
        _assertsharp2.default.AreEqual(2, new _linqsharp2.default([1, 2, -1]).Single(function (o) {
            return o > 1;
        }));
    });
    it("SingleOrDefault", function () {
        _assertsharp2.default.AreEqual(10, new _linqsharp2.default([1, 2]).SingleOrDefault(null, 10));
        _assertsharp2.default.AreEqual(10, new _linqsharp2.default([1, 2, 3, 4]).SingleOrDefault(function (o) {
            return o < 3;
        }, 10));
        _assertsharp2.default.AreEqual(1, new _linqsharp2.default([1]).SingleOrDefault());
        _assertsharp2.default.AreEqual(2, new _linqsharp2.default([1, 2, -1]).SingleOrDefault(function (o) {
            return o > 1;
        }));
    });
    it("Skip", function () {
        _assertsharp2.default.AreSequenceEqual([], new _linqsharp2.default([1, 2, 3, 4]).Skip(100).ToArray());
        _assertsharp2.default.AreSequenceEqual([3, 4], new _linqsharp2.default([1, 2, 3, 4]).Skip(2).ToArray());
        _assertsharp2.default.AreSequenceEqual([1, 2, 3, 4], new _linqsharp2.default([1, 2, 3, 4]).Skip(0).ToArray());
    });
    it("SkipWhile", function () {
        _assertsharp2.default.AreSequenceEqual([], new _linqsharp2.default([1, 2, 3, 4]).SkipWhile(function (o) {
            return o <= 100;
        }).ToArray());
        _assertsharp2.default.AreSequenceEqual([3, 4], new _linqsharp2.default([1, 2, 3, 4]).SkipWhile(function (o) {
            return o <= 2;
        }).ToArray());
    });
    it("Sum", function () {
        _assertsharp2.default.AreEqual(0, new _linqsharp2.default([]).Sum());
        _assertsharp2.default.AreEqual(10, new _linqsharp2.default([2, 2, 1, 5]).Sum());
        _assertsharp2.default.AreEqual(11, new _linqsharp2.default([{ Value: 2 }, { Value: 4 }, { Value: 5 }]).Sum(function (o) {
            return o.Value;
        }));
    });
    it("Take", function () {
        _assertsharp2.default.AreSequenceEqual([], new _linqsharp2.default([1, 2, 3, 4]).Take(0).ToArray());
        _assertsharp2.default.AreSequenceEqual([1, 2], new _linqsharp2.default([1, 2, 3, 4]).Take(2).ToArray());
        _assertsharp2.default.AreSequenceEqual([1, 2, 3, 4], new _linqsharp2.default([1, 2, 3, 4]).Take(10).ToArray());
    });
    it("TakeWhile", function () {
        _assertsharp2.default.AreSequenceEqual([], new _linqsharp2.default([1, 2, 3, 4]).TakeWhile(function (o) {
            return o < 1;
        }).ToArray());
        _assertsharp2.default.AreSequenceEqual([1, 2], new _linqsharp2.default([1, 2, 3, 4]).TakeWhile(function (o) {
            return o <= 2;
        }).ToArray());
        _assertsharp2.default.AreSequenceEqual([1, 2, 3, 4], new _linqsharp2.default([1, 2, 3, 4]).TakeWhile(function (o) {
            return o < 100;
        }).ToArray());
    });
    it("Union", function () {
        _assertsharp2.default.AreSequenceEqual([], new _linqsharp2.default([]).Union([]).ToArray());
        _assertsharp2.default.AreSequenceEqual([1, 2, 3], new _linqsharp2.default([1, 2]).Union([2, 3]).ToArray());
        _assertsharp2.default.AreSequenceEqual([1, 3, 2], new _linqsharp2.default([1, 3]).Union([2, 3]).ToArray());
    });
    it("Where", function () {
        _assertsharp2.default.AreSequenceEqual([], new _linqsharp2.default([1, 2]).Where(function (o) {
            return o > 100;
        }).ToArray());
        _assertsharp2.default.AreSequenceEqual([2], new _linqsharp2.default([1, 2]).Where(function (o) {
            return o > 1;
        }).ToArray());
    });
    it("Zip", function () {
        _assertsharp2.default.AreSequenceEqual(["1 one"], new _linqsharp2.default([1]).Zip(["one", "two"], function (o, i) {
            return o + " " + i;
        }).ToArray());
        _assertsharp2.default.AreSequenceEqual(["1 one", "2 two"], new _linqsharp2.default([1, 2]).Zip(["one", "two"], function (o, i) {
            return o + " " + i;
        }).ToArray());
        _assertsharp2.default.AreSequenceEqual(["1 one", "2 two"], new _linqsharp2.default([1, 2, 3]).Zip(["one", "two"], function (o, i) {
            return o + " " + i;
        }).ToArray());
    });
});