"use strict";

var linqsharp_1 = require("./linqsharp");
var assertsharp_1 = require("assertsharp");
function assert(expected, actual) {
    var errorMessage = arguments.length <= 2 || arguments[2] === undefined ? "Test fail" : arguments[2];

    if (expected != actual) throw new Error(errorMessage);
}
describe("linqsharp", function () {
    it("Aggregate", function () {
        assertsharp_1.default.AreEqual(106, new linqsharp_1.default([3, 100, 1, 2]).Aggregate(function (a, b) {
            return a + b;
        }));
    });
    it("All", function () {
        assertsharp_1.default.IsTrue(new linqsharp_1.default([3, 100, 1, 2]).All(function (i) {
            return i > 0;
        }));
    });
    it("Any", function () {
        assertsharp_1.default.IsTrue(new linqsharp_1.default([3, 100, 1, 2]).Any(function (i) {
            return i == 1;
        }));
    });
    it("Average", function () {
        assertsharp_1.default.AreEqual((3 + 100 + 1 + 2) / 4, new linqsharp_1.default([3, 100, 1, 2]).Average());
        assertsharp_1.default.AreEqual((3 + 100 + 1 + 2) / 4, new linqsharp_1.default([{ Value: 3 }, { Value: 100 }, { Value: 1 }, { Value: 2 }]).Average(function (o) {
            return o.Value;
        }));
    });
    it("Concat", function () {
        var expected = [1, 2, 3, 4];
        var actual = new linqsharp_1.default([1, 2]).Concat([3, 4]).ToArray();
        assertsharp_1.default.AreEqual(expected.length, actual.length);
        assertsharp_1.default.AreEqual(expected[0], actual[0]);
        assertsharp_1.default.AreEqual(expected[1], actual[1]);
        assertsharp_1.default.AreEqual(expected[2], actual[2]);
        assertsharp_1.default.AreEqual(expected[3], actual[3]);
    });
    it("Contains", function () {
        assertsharp_1.default.IsTrue(new linqsharp_1.default([1, 2, 3]).Contains(2));
        assertsharp_1.default.IsFalse(new linqsharp_1.default([1, 2, 3]).Contains(20));
        var comparer = {
            Equals: function Equals(x, y) {
                return x == y;
            },
            GetHashCode: function GetHashCode(obj) {
                return obj;
            }
        };
        assertsharp_1.default.IsTrue(new linqsharp_1.default([1, 2, 3]).Contains(2, comparer));
        assertsharp_1.default.IsFalse(new linqsharp_1.default([1, 2, 3]).Contains(20, comparer));
    });
    it("Count", function () {
        assertsharp_1.default.AreEqual(4, new linqsharp_1.default([1, 2, 3, 5]).Count());
        assertsharp_1.default.AreEqual(2, new linqsharp_1.default([1, 2, 3, 5]).Count(function (o) {
            return o <= 2;
        }));
    });
    it("Distinct", function () {
        var expected = [1, 2];
        var actual = new linqsharp_1.default([1, 1, 2, 2]).Distinct().ToArray();
        assertsharp_1.default.AreEqual(expected.length, actual.length);
        assertsharp_1.default.AreEqual(expected[0], actual[0]);
        assertsharp_1.default.AreEqual(expected[1], actual[1]);
        var comparer = {
            Equals: function Equals(x, y) {
                return x == y;
            },
            GetHashCode: function GetHashCode(obj) {
                return obj;
            }
        };
        actual = new linqsharp_1.default([1, 1, 2, 2]).Distinct(comparer).ToArray();
        assertsharp_1.default.AreEqual(expected.length, actual.length);
        assertsharp_1.default.AreEqual(expected[0], actual[0]);
        assertsharp_1.default.AreEqual(expected[1], actual[1]);
    });
    it("DistinctBy", function () {
        var expected = [{ Value: 1 }, { Value: 2 }];
        var actual = new linqsharp_1.default([{ Value: 1 }, { Value: 2 }, { Value: 1 }]).DistinctBy(function (o) {
            return o.Value;
        }).ToArray();
        assertsharp_1.default.AreEqual(expected.length, actual.length);
        assertsharp_1.default.AreEqual(expected[0].Value, actual[0].Value);
        assertsharp_1.default.AreEqual(expected[1].Value, actual[1].Value);
        var comparer = {
            Equals: function Equals(x, y) {
                return x.Value == y.Value;
            },
            GetHashCode: function GetHashCode(obj) {
                return obj.Value;
            }
        };
        actual = new linqsharp_1.default([{ Value: 1 }, { Value: 2 }, { Value: 1 }]).DistinctBy(function (o) {
            return o;
        }, comparer).ToArray();
        assertsharp_1.default.AreEqual(expected.length, actual.length);
        assertsharp_1.default.AreEqual(expected[0].Value, actual[0].Value);
        assertsharp_1.default.AreEqual(expected[1].Value, actual[1].Value);
    });
    it("ElementAt", function () {
        assertsharp_1.default.AreEqual(5, new linqsharp_1.default([1, 2, 5, 4]).ElementAt(2));
        assertsharp_1.default.Throws(function () {
            return new linqsharp_1.default([1]).ElementAt(-1);
        });
        assertsharp_1.default.Throws(function () {
            return new linqsharp_1.default([1]).ElementAt(1);
        });
    });
    it("ElementAtOrDefault", function () {
        assertsharp_1.default.AreEqual(10, new linqsharp_1.default([1, 2, 3]).ElementAtOrDefault(100, 10));
        assertsharp_1.default.AreEqual(2, new linqsharp_1.default([1, 2]).ElementAtOrDefault(1, 10));
    });
    it("Except", function () {
        var expected = [1, 2];
        var actual = new linqsharp_1.default([1, 2, 3, 4]).Except([3, 4]).ToArray();
        assertsharp_1.default.AreEqual(expected.length, actual.length, "without comparer");
        assertsharp_1.default.AreEqual(expected[0], actual[0]);
        assertsharp_1.default.AreEqual(expected[1], actual[1]);
        var comparer = {
            Equals: function Equals(x, y) {
                return x.Value == y.Value;
            },
            GetHashCode: function GetHashCode(obj) {
                return obj.Value;
            }
        };
        expected = [{ Value: 1 }, { Value: 2 }];
        actual = new linqsharp_1.default([{ Value: 1 }, { Value: 2 }, { Value: 3 }, { Value: 4 }]).Except([{ Value: 3 }, { Value: 4 }], comparer).ToArray();
        assertsharp_1.default.AreEqual(expected.length, actual.length, "with comparer");
        assertsharp_1.default.AreEqual(expected[0].Value, actual[0].Value);
        assertsharp_1.default.AreEqual(expected[1].Value, actual[1].Value);
    });
    it("First", function () {
        assertsharp_1.default.AreEqual(1, new linqsharp_1.default([1, 2, 3]).First());
        assertsharp_1.default.Throws(function () {
            return new linqsharp_1.default([]).First();
        });
        assertsharp_1.default.AreEqual(2, new linqsharp_1.default([1, 2, 3]).First(function (o) {
            return o == 2;
        }));
        assertsharp_1.default.Throws(function () {
            return new linqsharp_1.default([1, 2]).First(function (o) {
                return o == 3;
            });
        });
    });
    it("FirstOrDefault", function () {
        assertsharp_1.default.AreEqual(1, new linqsharp_1.default([1, 2, 3]).FirstOrDefault());
        assertsharp_1.default.AreEqual(10, new linqsharp_1.default([]).FirstOrDefault(null, 10));
        assertsharp_1.default.AreEqual(3, new linqsharp_1.default([1, 2, 3]).FirstOrDefault(function (o) {
            return o == 3;
        }));
        assertsharp_1.default.AreEqual(10, new linqsharp_1.default([1, 2, 3]).FirstOrDefault(function (o) {
            return o == 11;
        }, 10));
    });
    it("ForEach", function () {
        var actual = 1;
        new linqsharp_1.default([1, 2, 3]).ForEach(function (i) {
            return actual *= i;
        });
        assertsharp_1.default.AreEqual(6, actual);
        actual = 1;
        new linqsharp_1.default([1, 2, 10, 110, 1110]).ForEach(function (i) {
            if (i > 2) return false;actual *= i;
        });
        assertsharp_1.default.AreEqual(2, actual);
    });
    it("GroupBy", function () {
        var actual = new linqsharp_1.default([{ Key: 1, Value: 2 }, { Key: 1, Value: 3 }]).GroupBy(function (o) {
            return o.Key;
        });
        assertsharp_1.default.AreEqual(1, actual.Count());
        assertsharp_1.default.AreEqual(2, actual.ElementAt(0).Elements.length);
    });
    it("IndexOf", function () {
        assertsharp_1.default.AreEqual(2, new linqsharp_1.default([0, 2, 1]).IndexOf(1));
        assertsharp_1.default.AreEqual(-1, new linqsharp_1.default([0, 2, 1]).IndexOf(100));
        assertsharp_1.default.AreEqual(-1, new linqsharp_1.default([]).IndexOf(0));
        assertsharp_1.default.AreEqual(-1, new linqsharp_1.default([]).IndexOf(undefined));
        assertsharp_1.default.AreEqual(-1, new linqsharp_1.default([]).IndexOf(null));
    });
    it("Intersect", function () {
        assertsharp_1.default.AreSequenceEqual([1, 2, 3], new linqsharp_1.default([1, 2, 3, 4, 5]).Intersect([1, 2, 3]).ToArray(), function (x, y) {
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
        assertsharp_1.default.AreSequenceEqual([{ Value: 1 }, { Value: 3 }], new linqsharp_1.default([{ Value: 1 }, { Value: 3 }, { Value: 2 }]).Intersect([{ Value: 1 }, { Value: 3 }], comparer).ToArray(), function (x, y) {
            return x.Value == y.Value;
        });
    });
    it("Join", function () {
        var joinedSimple = new linqsharp_1.default([1]).Join([1], function (o) {
            return o;
        }, function (i) {
            return i;
        }, function (o, i) {
            return { Outer: o, Inner: i };
        });
        assertsharp_1.default.AreEqual(1, joinedSimple.Count(), "Element count is wrong.");
        assertsharp_1.default.AreEqual(1, joinedSimple.First().Outer);
        assertsharp_1.default.AreEqual(1, joinedSimple.First().Inner);
        var joined = new linqsharp_1.default([{ ID: 1, Value: 1 }]).Join([{ ID: 1, Value: 2 }], function (o) {
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
        assertsharp_1.default.AreEqual(1, joined.Count(), "Element count with comparer is wrong.");
        assertsharp_1.default.AreEqual(1, joined.First().Outer);
        assertsharp_1.default.AreEqual(2, joined.First().Inner);
    });
    it("Last", function () {
        assertsharp_1.default.AreEqual(1, new linqsharp_1.default([3, 4, 1]).Last());
        assertsharp_1.default.AreEqual(4, new linqsharp_1.default([3, 4, 1]).Last(function (o) {
            return o > 1;
        }));
        assertsharp_1.default.Throws(function () {
            return new linqsharp_1.default([]).Last();
        });
        assertsharp_1.default.Throws(function () {
            return new linqsharp_1.default([3, 4, 1]).Last(function (o) {
                return o > 100;
            });
        });
    });
    it("LastOrDefault", function () {
        assertsharp_1.default.AreEqual(1, new linqsharp_1.default([3, 4, 1]).Last());
        assertsharp_1.default.AreEqual(4, new linqsharp_1.default([3, 4, 1]).Last(function (o) {
            return o > 1;
        }));
        assertsharp_1.default.AreEqual(100, new linqsharp_1.default([]).LastOrDefault(null, 100));
        assertsharp_1.default.AreEqual(100, new linqsharp_1.default([3, 4, 1]).LastOrDefault(function (o) {
            return o > 100;
        }, 100));
    });
    it("Max", function () {
        assertsharp_1.default.AreEqual(10, new linqsharp_1.default([5, 7, 2, 10]).Max());
        assertsharp_1.default.AreEqual(10, new linqsharp_1.default([{ Value: 10 }, { Value: 7 }]).Max(function (o) {
            return o.Value;
        }));
        assertsharp_1.default.Throws(function () {
            return new linqsharp_1.default([]).Max();
        });
    });
    it("Min", function () {
        assertsharp_1.default.AreEqual(2, new linqsharp_1.default([5, 7, 2, 10]).Min());
        assertsharp_1.default.AreEqual(7, new linqsharp_1.default([{ Value: 10 }, { Value: 7 }]).Min(function (o) {
            return o.Value;
        }));
        assertsharp_1.default.Throws(function () {
            return new linqsharp_1.default([]).Min();
        });
    });
    it("OrderBy", function () {
        assertsharp_1.default.AreSequenceEqual([1, 2, 3], new linqsharp_1.default([3, 1, 2]).OrderBy(function (o) {
            return o;
        }).ToArray(), null, "Failed to order");
        assertsharp_1.default.AreSequenceEqual([{ Value: 1 }, { Value: 2 }], new linqsharp_1.default([{ Value: 2 }, { Value: 1 }]).OrderBy(function (o) {
            return o.Value;
        }).ToArray(), function (a, b) {
            return a.Value == b.Value;
        }, "Failed to order objects");
        assertsharp_1.default.AreSequenceEqual([{ Value: 2 }, { Value: 1 }], new linqsharp_1.default([{ Value: 1 }, { Value: 2 }]).OrderBy(function (o) {
            return o.Value;
        }, function (a, b) {
            return b - a;
        }).ToArray(), function (a, b) {
            return a.Value == b.Value;
        }, "Failed to order object with comparer");
        assertsharp_1.default.AreSequenceEqual([], new linqsharp_1.default([]).OrderBy(function (o) {
            return o;
        }).ToArray(), null, "Failed to order empty arrays");
        assertsharp_1.default.AreSequenceEqual(["a", "b", "c"], new linqsharp_1.default(["c", "a", "b"]).OrderBy(function (o) {
            return o;
        }).ToArray());
        assertsharp_1.default.AreEqual("a", new linqsharp_1.default([{ Title: "b", Message: "b" }, { Title: "c", Message: "c" }, { Title: "a", Message: "a" }]).OrderBy(function (o) {
            return o.Title;
        }).First().Title);
    });
    it("OrderByDescending", function () {
        assertsharp_1.default.AreSequenceEqual([3, 2, 1], new linqsharp_1.default([3, 1, 2]).OrderByDescending(function (o) {
            return o;
        }).ToArray(), null, "Failed to order");
        assertsharp_1.default.AreSequenceEqual([{ Value: 2 }, { Value: 1 }], new linqsharp_1.default([{ Value: 1 }, { Value: 2 }]).OrderByDescending(function (o) {
            return o.Value;
        }).ToArray(), function (a, b) {
            return a.Value == b.Value;
        }, "Failed to order objects");
        assertsharp_1.default.AreSequenceEqual([{ Value: 1 }, { Value: 2 }], new linqsharp_1.default([{ Value: 2 }, { Value: 1 }]).OrderByDescending(function (o) {
            return o.Value;
        }, function (a, b) {
            return b - a;
        }).ToArray(), function (a, b) {
            return a.Value == b.Value;
        }, "Failed to order object with comparer");
        assertsharp_1.default.AreSequenceEqual([], new linqsharp_1.default([]).OrderByDescending(function (o) {
            return o;
        }).ToArray(), null, "Failed to order empty arrays");
    });
    it("Reverse", function () {
        assertsharp_1.default.AreSequenceEqual([], new linqsharp_1.default([]).Reverse().ToArray(), null, "Failed to reverse empty arrays");
        assertsharp_1.default.AreSequenceEqual([2, 1], new linqsharp_1.default([1, 2]).Reverse().ToArray(), null, "Failed to reverse even arrays");
        assertsharp_1.default.AreSequenceEqual([3, 2, 1], new linqsharp_1.default([1, 2, 3]).Reverse().ToArray(), null, "Failed to reverse odd arrays");
        assertsharp_1.default.AreSequenceEqual([{ Value: 1 }, { Value: 2 }], new linqsharp_1.default([{ Value: 2 }, { Value: 1 }]).Reverse().ToArray(), function (a, b) {
            return a.Value == b.Value;
        }, "Failed to reverse object arrays");
    });
    it("Select", function () {
        assertsharp_1.default.AreSequenceEqual([1, 2, 3], new linqsharp_1.default([{ Value: 1 }, { Value: 2 }, { Value: 3 }]).Select(function (o) {
            return o.Value;
        }).ToArray());
    });
    it("SelectMany", function () {
        assertsharp_1.default.AreSequenceEqual([], new linqsharp_1.default([]).SelectMany(function (o) {
            return o;
        }).ToArray());
        assertsharp_1.default.AreSequenceEqual([1, 2, 3, 4, 5, 6], new linqsharp_1.default([[1, 2, 3], [4, 5, 6]]).SelectMany(function (o) {
            return o;
        }).ToArray());
        assertsharp_1.default.AreSequenceEqual([1, 2, 3, 4], new linqsharp_1.default([{ Values: [1, 2] }, { Values: [3, 4] }]).SelectMany(function (o) {
            return o.Values;
        }).ToArray());
        assertsharp_1.default.AreSequenceEqual([10, 20, 30, 40], new linqsharp_1.default([{ Values: [1, 2] }, { Values: [3, 4] }]).SelectMany(function (o) {
            return o.Values;
        }, function (o) {
            return o * 10;
        }).ToArray());
    });
    it("SequenceEqual", function () {
        assertsharp_1.default.Throws(function () {
            return new linqsharp_1.default([]).SequenceEqual(null);
        });
        assertsharp_1.default.IsTrue(new linqsharp_1.default([1, 2]).SequenceEqual([1, 2]));
        assertsharp_1.default.IsFalse(new linqsharp_1.default([1, 2]).SequenceEqual([1, 2, 3]));
        assertsharp_1.default.IsFalse(new linqsharp_1.default([1, 2]).SequenceEqual([2, 1]));
    });
    it("Single", function () {
        assertsharp_1.default.Throws(function () {
            return new linqsharp_1.default([1, 2]).Single();
        });
        assertsharp_1.default.Throws(function () {
            return new linqsharp_1.default([1, 2, 3, 4]).Single(function (o) {
                return o < 3;
            });
        });
        assertsharp_1.default.AreEqual(1, new linqsharp_1.default([1]).Single());
        assertsharp_1.default.AreEqual(2, new linqsharp_1.default([1, 2, -1]).Single(function (o) {
            return o > 1;
        }));
    });
    it("SingleOrDefault", function () {
        assertsharp_1.default.AreEqual(10, new linqsharp_1.default([1, 2]).SingleOrDefault(null, 10));
        assertsharp_1.default.AreEqual(10, new linqsharp_1.default([1, 2, 3, 4]).SingleOrDefault(function (o) {
            return o < 3;
        }, 10));
        assertsharp_1.default.AreEqual(1, new linqsharp_1.default([1]).SingleOrDefault());
        assertsharp_1.default.AreEqual(2, new linqsharp_1.default([1, 2, -1]).SingleOrDefault(function (o) {
            return o > 1;
        }));
    });
    it("Skip", function () {
        assertsharp_1.default.AreSequenceEqual([], new linqsharp_1.default([1, 2, 3, 4]).Skip(100).ToArray());
        assertsharp_1.default.AreSequenceEqual([3, 4], new linqsharp_1.default([1, 2, 3, 4]).Skip(2).ToArray());
        assertsharp_1.default.AreSequenceEqual([1, 2, 3, 4], new linqsharp_1.default([1, 2, 3, 4]).Skip(0).ToArray());
    });
    it("SkipWhile", function () {
        assertsharp_1.default.AreSequenceEqual([], new linqsharp_1.default([1, 2, 3, 4]).SkipWhile(function (o) {
            return o <= 100;
        }).ToArray());
        assertsharp_1.default.AreSequenceEqual([3, 4], new linqsharp_1.default([1, 2, 3, 4]).SkipWhile(function (o) {
            return o <= 2;
        }).ToArray());
    });
    it("Sum", function () {
        assertsharp_1.default.AreEqual(0, new linqsharp_1.default([]).Sum());
        assertsharp_1.default.AreEqual(10, new linqsharp_1.default([2, 2, 1, 5]).Sum());
        assertsharp_1.default.AreEqual(11, new linqsharp_1.default([{ Value: 2 }, { Value: 4 }, { Value: 5 }]).Sum(function (o) {
            return o.Value;
        }));
    });
    it("Take", function () {
        assertsharp_1.default.AreSequenceEqual([], new linqsharp_1.default([1, 2, 3, 4]).Take(0).ToArray());
        assertsharp_1.default.AreSequenceEqual([1, 2], new linqsharp_1.default([1, 2, 3, 4]).Take(2).ToArray());
        assertsharp_1.default.AreSequenceEqual([1, 2, 3, 4], new linqsharp_1.default([1, 2, 3, 4]).Take(10).ToArray());
    });
    it("TakeWhile", function () {
        assertsharp_1.default.AreSequenceEqual([], new linqsharp_1.default([1, 2, 3, 4]).TakeWhile(function (o) {
            return o < 1;
        }).ToArray());
        assertsharp_1.default.AreSequenceEqual([1, 2], new linqsharp_1.default([1, 2, 3, 4]).TakeWhile(function (o) {
            return o <= 2;
        }).ToArray());
        assertsharp_1.default.AreSequenceEqual([1, 2, 3, 4], new linqsharp_1.default([1, 2, 3, 4]).TakeWhile(function (o) {
            return o < 100;
        }).ToArray());
    });
    it("Union", function () {
        assertsharp_1.default.AreSequenceEqual([], new linqsharp_1.default([]).Union([]).ToArray());
        assertsharp_1.default.AreSequenceEqual([1, 2, 3], new linqsharp_1.default([1, 2]).Union([2, 3]).ToArray());
        assertsharp_1.default.AreSequenceEqual([1, 3, 2], new linqsharp_1.default([1, 3]).Union([2, 3]).ToArray());
    });
    it("Where", function () {
        assertsharp_1.default.AreSequenceEqual([], new linqsharp_1.default([1, 2]).Where(function (o) {
            return o > 100;
        }).ToArray());
        assertsharp_1.default.AreSequenceEqual([2], new linqsharp_1.default([1, 2]).Where(function (o) {
            return o > 1;
        }).ToArray());
    });
    it("Zip", function () {
        assertsharp_1.default.AreSequenceEqual(["1 one"], new linqsharp_1.default([1]).Zip(["one", "two"], function (o, i) {
            return o + " " + i;
        }).ToArray());
        assertsharp_1.default.AreSequenceEqual(["1 one", "2 two"], new linqsharp_1.default([1, 2]).Zip(["one", "two"], function (o, i) {
            return o + " " + i;
        }).ToArray());
        assertsharp_1.default.AreSequenceEqual(["1 one", "2 two"], new linqsharp_1.default([1, 2, 3]).Zip(["one", "two"], function (o, i) {
            return o + " " + i;
        }).ToArray());
    });
});