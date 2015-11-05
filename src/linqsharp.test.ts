import Linq from "./linqsharp";
import Assert from "assertsharp";

function assert(expected, actual, errorMessage = "Test fail") {
    if (expected != actual)
        throw new Error(errorMessage);
}

describe("linqsharp", () => {
    it("Aggregate", () => {
        Assert.AreEqual(106
            , new Linq<number>([3, 100, 1, 2]).Aggregate((a, b) => a + b)
        );
    });

    it("All", () => {
        Assert.IsTrue(new Linq([3, 100, 1, 2]).All(i => i > 0));
    });

    it("Any", () => {
        Assert.IsTrue(new Linq([3, 100, 1, 2]).Any(i => i == 1));
    });

    it("Average", () => {
        Assert.AreEqual((3 + 100 + 1 + 2) / 4
            , new Linq([3, 100, 1, 2]).Average()
            );

        Assert.AreEqual((3 + 100 + 1 + 2) / 4
            , new Linq<any>([{ Value: 3 }, { Value: 100 }, { Value: 1 }, { Value: 2 }])
                .Average(o => o.Value)
            );
    });

    it("Concat", () => {
        var expected = [1, 2, 3, 4];
        var actual = new Linq([1, 2]).Concat([3, 4]).ToArray();

        Assert.AreEqual(expected.length, actual.length);
        Assert.AreEqual(expected[0], actual[0]);
        Assert.AreEqual(expected[1], actual[1]);
        Assert.AreEqual(expected[2], actual[2]);
        Assert.AreEqual(expected[3], actual[3]);
    });

    it("Contains", () => {
        Assert.IsTrue(new Linq([1, 2, 3]).Contains(2));
        Assert.IsFalse(new Linq([1, 2, 3]).Contains(20));

        var comparer = {
            Equals: function(x, y) { return x == y; },
            GetHashCode: function(obj) { return obj; }
        };

        Assert.IsTrue(new Linq([1, 2, 3]).Contains(2, comparer));
        Assert.IsFalse(new Linq([1, 2, 3]).Contains(20, comparer));
    });

    it("Count", () => {
        Assert.AreEqual(4, new Linq([1, 2, 3, 5]).Count());

        Assert.AreEqual(2, new Linq([1, 2, 3, 5]).Count(o => o <= 2));
    });

    it("Distinct", () => {
        var expected = [1, 2];
        var actual = new Linq([1, 1, 2, 2]).Distinct().ToArray();

        Assert.AreEqual(expected.length, actual.length);
        Assert.AreEqual(expected[0], actual[0]);
        Assert.AreEqual(expected[1], actual[1]);

        var comparer = {
            Equals: (x, y) => { return x == y; },
            GetHashCode: (obj) => { return obj; }
        };

        actual = new Linq([1, 1, 2, 2]).Distinct(comparer).ToArray();

        Assert.AreEqual(expected.length, actual.length);
        Assert.AreEqual(expected[0], actual[0]);
        Assert.AreEqual(expected[1], actual[1]);
    });

    it("DistinctBy", () => {
        var expected = [{ Value: 1 }, { Value: 2 }];
        var actual = new Linq<any>([{ Value: 1 }, { Value: 2 }, { Value: 1 }])
            .DistinctBy(o => o.Value).ToArray();

        Assert.AreEqual(expected.length, actual.length);
        Assert.AreEqual(expected[0].Value, actual[0].Value);
        Assert.AreEqual(expected[1].Value, actual[1].Value);

        var comparer = {
            Equals: (x, y) => { return x.Value == y.Value; },
            GetHashCode: (obj) => { return obj.Value; }
        };

        actual = new Linq([{ Value: 1 }, { Value: 2 }, { Value: 1 }])
            .DistinctBy(o => o, comparer).ToArray();

        Assert.AreEqual(expected.length, actual.length);
        Assert.AreEqual(expected[0].Value, actual[0].Value);
        Assert.AreEqual(expected[1].Value, actual[1].Value);
    });

    it("ElementAt", () => {
        Assert.AreEqual(5, new Linq([1, 2, 5, 4]).ElementAt(2));
        Assert.Throws(() => new Linq([1]).ElementAt(-1));
        Assert.Throws(() => new Linq([1]).ElementAt(1));
    });

    it("ElementAtOrDefault", () => {
        Assert.AreEqual(10, new Linq([1, 2, 3]).ElementAtOrDefault(100, 10));
        Assert.AreEqual(2, new Linq([1, 2]).ElementAtOrDefault(1, 10));
    });

    it("Except", () => {
        var expected: any = [1, 2];
        var actual: any = new Linq([1, 2, 3, 4]).Except([3, 4]).ToArray();

        Assert.AreEqual(expected.length, actual.length, "without comparer");
        Assert.AreEqual(expected[0], actual[0]);
        Assert.AreEqual(expected[1], actual[1]);

        var comparer = {
            Equals: (x, y) => { return x.Value == y.Value; },
            GetHashCode: (obj) => { return obj.Value; }
        };

        expected = [{ Value: 1 }, { Value: 2 }];
        actual = new Linq<any>([{ Value: 1 }, { Value: 2 }, { Value: 3 }, { Value: 4 }])
            .Except([{ Value: 3 }, { Value: 4 }], comparer).ToArray();

        Assert.AreEqual(expected.length, actual.length, "with comparer");
        Assert.AreEqual(expected[0].Value, actual[0].Value);
        Assert.AreEqual(expected[1].Value, actual[1].Value);
    });

    it("First", () => {
        Assert.AreEqual(1, new Linq([1, 2, 3]).First());
        Assert.Throws(() => new Linq([]).First());

        Assert.AreEqual(2, new Linq([1, 2, 3]).First(o => o == 2));
        Assert.Throws(() => new Linq([1, 2]).First(o => o == 3));
    });

    it("FirstOrDefault", () => {
        Assert.AreEqual(1, new Linq([1, 2, 3]).FirstOrDefault());
        Assert.AreEqual(10, new Linq([]).FirstOrDefault(null, 10));

        Assert.AreEqual(3, new Linq([1, 2, 3]).FirstOrDefault(o => o == 3));
        Assert.AreEqual(10, new Linq([1, 2, 3]).FirstOrDefault(o => o == 11, 10));
    });

    it("ForEach", () => {
        var actual = 1;
        new Linq<number>([1, 2, 3]).ForEach(i => actual *= i);

        Assert.AreEqual(6, actual);

        actual = 1;
        new Linq<number>([1, 2, 10, 110, 1110]).ForEach(i => { if (i > 2) return false; actual *= i; });

        Assert.AreEqual(2, actual);
    });

    it("GroupBy", () => {
        var actual = new Linq<any>([{ Key: 1, Value: 2 }, { Key: 1, Value: 3 }])
            .GroupBy(o => o.Key);

        Assert.AreEqual(1, actual.Count());
        Assert.AreEqual(2, actual.ElementAt(0).Elements.length);
    });

    it("IndexOf", () => {
        Assert.AreEqual(2, new Linq([0, 2, 1]).IndexOf(1));
        Assert.AreEqual(-1, new Linq([0, 2, 1]).IndexOf(100));
        Assert.AreEqual(-1, new Linq([]).IndexOf(0));
        Assert.AreEqual(-1, new Linq([]).IndexOf(undefined));
        Assert.AreEqual(-1, new Linq([]).IndexOf(null));
    });

    it("Intersect", () => {
        Assert.AreSequenceEqual(
            [1, 2, 3]
            , new Linq([1, 2, 3, 4, 5]).Intersect([1, 2, 3]).ToArray()
            , (x, y) => x == y
            );

        var comparer = {
            Equals: (x, y) => { return x.Value == y.Value; },
            GetHashCode: (obj) => { return obj.Value; }
        };

        Assert.AreSequenceEqual(
            [{ Value: 1 }, { Value: 3 }]
            , new Linq([{ Value: 1 }, { Value: 3 }, { Value: 2 }])
                .Intersect([{ Value: 1 }, { Value: 3 }], comparer).ToArray()
            , (x, y) => x.Value == y.Value
            );
    });

    it("Join", () => {
        var joinedSimple = new Linq<number>([1]).Join([1], o => o, i => i, (o, i) => { return { Outer: o, Inner: i } });
        Assert.AreEqual(1, joinedSimple.Count(), "Element count is wrong.");
        Assert.AreEqual(1, (<any>joinedSimple.First()).Outer);
        Assert.AreEqual(1, (<any>joinedSimple.First()).Inner);

        var joined = new Linq<any>([{ ID: 1, Value: 1 }])
            .Join([{ ID: 1, Value: 2 }]
            , o => o
            , i => i
            , (o, i) => { return { Outer: o.Value, Inner: i.Value } }
            , {
                Equals: (x, y) => x.ID == y.ID,
                GetHashCode: (obj) => obj.ID
            }
            );
        Assert.AreEqual(1, joined.Count(), "Element count with comparer is wrong.");
        Assert.AreEqual(1, joined.First().Outer);
        Assert.AreEqual(2, joined.First().Inner);
    });

    it("Last", () => {
        Assert.AreEqual(1, new Linq([3, 4, 1]).Last());
        Assert.AreEqual(4, new Linq([3, 4, 1]).Last(o => o > 1));
        Assert.Throws(() => new Linq([]).Last());
        Assert.Throws(() => new Linq([3, 4, 1]).Last(o => o > 100));
    });

    it("LastOrDefault", () => {
        Assert.AreEqual(1, new Linq([3, 4, 1]).Last());
        Assert.AreEqual(4, new Linq([3, 4, 1]).Last(o => o > 1));
        Assert.AreEqual(100, new Linq([]).LastOrDefault(null, 100));
        Assert.AreEqual(100, new Linq([3, 4, 1]).LastOrDefault(o => o > 100, 100));
    });

    it("Max", () => {
        Assert.AreEqual(10, new Linq([5, 7, 2, 10]).Max());
        Assert.AreEqual(10, new Linq<any>([{ Value: 10 }, { Value: 7 }]).Max(o => o.Value));
        Assert.Throws(() => new Linq([]).Max());
    });

    it("Min", () => {
        Assert.AreEqual(2, new Linq([5, 7, 2, 10]).Min());
        Assert.AreEqual(7, new Linq<any>([{ Value: 10 }, { Value: 7 }]).Min(o => o.Value));
        Assert.Throws(() => new Linq([]).Min());
    });

    it("OrderBy", () => {
        Assert.AreSequenceEqual([1, 2, 3], new Linq([3, 1, 2]).OrderBy(o => o).ToArray(), null, "Failed to order");

        Assert.AreSequenceEqual([{ Value: 1 }, { Value: 2 }],
            new Linq<any>([{ Value: 2 }, { Value: 1 }]).OrderBy(o => o.Value).ToArray()
            , (a, b) => a.Value == b.Value, "Failed to order objects");

        Assert.AreSequenceEqual([{ Value: 2 }, { Value: 1 }],
            new Linq<any>([{ Value: 1 }, { Value: 2 }])
                .OrderBy(o => o.Value, (a, b) => b - a).ToArray()
            , (a, b) => a.Value == b.Value, "Failed to order object with comparer");

        Assert.AreSequenceEqual([], new Linq([]).OrderBy(o => o).ToArray(), null, "Failed to order empty arrays");

        Assert.AreSequenceEqual(["a", "b", "c"], new Linq(["c", "a", "b"]).OrderBy(o => o).ToArray());

        Assert.AreEqual("a"
            , new Linq<any>([{ Title: "b", Message: "b" }, { Title: "c", Message: "c" }, { Title: "a", Message: "a" }]).OrderBy(o => o.Title).First().Title);
    });

    it("OrderByDescending", () => {
        Assert.AreSequenceEqual([3, 2, 1], new Linq([3, 1, 2]).OrderByDescending(o => o).ToArray(), null, "Failed to order");

        Assert.AreSequenceEqual([{ Value: 2 }, { Value: 1 }],
            new Linq<any>([{ Value: 1 }, { Value: 2 }]).OrderByDescending(o => o.Value).ToArray()
            , (a, b) => a.Value == b.Value, "Failed to order objects");

        Assert.AreSequenceEqual([{ Value: 1 }, { Value: 2 }],
            new Linq<any>([{ Value: 2 }, { Value: 1 }])
                .OrderByDescending(o => o.Value, (a, b) => b - a).ToArray()
            , (a, b) => a.Value == b.Value, "Failed to order object with comparer");

        Assert.AreSequenceEqual([], new Linq([]).OrderByDescending(o => o).ToArray(), null, "Failed to order empty arrays");
    });

    it("Reverse", () => {
        Assert.AreSequenceEqual([], new Linq([]).Reverse().ToArray(), null, "Failed to reverse empty arrays");
        Assert.AreSequenceEqual([2, 1], new Linq([1, 2]).Reverse().ToArray(), null, "Failed to reverse even arrays");
        Assert.AreSequenceEqual([3, 2, 1], new Linq([1, 2, 3]).Reverse().ToArray(), null, "Failed to reverse odd arrays");
        Assert.AreSequenceEqual([{ Value: 1 }, { Value: 2 }]
            , new Linq([{ Value: 2 }, { Value: 1 }]).Reverse().ToArray()
            , (a, b) => a.Value == b.Value, "Failed to reverse object arrays");

    });

    it("Select", () => {
        Assert.AreSequenceEqual(
            [1, 2, 3]
            , new Linq([{ Value: 1 }, { Value: 2 }, { Value: 3 }])
                .Select(o => o.Value).ToArray()
            );
    });

    it("SelectMany", () => {
        Assert.AreSequenceEqual([], new Linq<any>([]).SelectMany(o => o).ToArray());

        Assert.AreSequenceEqual([1, 2, 3, 4, 5, 6]
            , new Linq<any>([[1, 2, 3], [4, 5, 6]]).SelectMany(o => o).ToArray());

        Assert.AreSequenceEqual([1, 2, 3, 4]
            , new Linq<any>([{ Values: [1, 2] }, { Values: [3, 4] }])
                .SelectMany(o => o.Values).ToArray());

        Assert.AreSequenceEqual([10, 20, 30, 40]
            , new Linq<any>([{ Values: [1, 2] }, { Values: [3, 4] }])
                .SelectMany(o => o.Values, o => o * 10).ToArray());
    });

    it("SequenceEqual", () => {
        Assert.Throws(() => new Linq([]).SequenceEqual(null));

        Assert.IsTrue(new Linq([1, 2]).SequenceEqual([1, 2]));
        Assert.IsFalse(new Linq([1, 2]).SequenceEqual([1, 2, 3]));
        Assert.IsFalse(new Linq([1, 2]).SequenceEqual([2, 1]));
    });

    it("Single", () => {
        Assert.Throws(() => new Linq([1, 2]).Single());
        Assert.Throws(() => new Linq([1, 2, 3, 4]).Single(o => o < 3));

        Assert.AreEqual(1, new Linq([1]).Single());
        Assert.AreEqual(2, new Linq([1, 2, -1]).Single(o => o > 1));
    });

    it("SingleOrDefault", () => {
        Assert.AreEqual(10, new Linq([1, 2]).SingleOrDefault(null, 10));
        Assert.AreEqual(10, new Linq([1, 2, 3, 4]).SingleOrDefault(o => o < 3, 10));


        Assert.AreEqual(1, new Linq([1]).SingleOrDefault());
        Assert.AreEqual(2, new Linq([1, 2, -1]).SingleOrDefault(o => o > 1));
    });

    it("Skip", () => {
        Assert.AreSequenceEqual([], new Linq([1, 2, 3, 4]).Skip(100).ToArray());
        Assert.AreSequenceEqual([3, 4], new Linq([1, 2, 3, 4]).Skip(2).ToArray());
        Assert.AreSequenceEqual([1, 2, 3, 4], new Linq([1, 2, 3, 4]).Skip(0).ToArray());
    });

    it("SkipWhile", () => {
        Assert.AreSequenceEqual([], new Linq([1, 2, 3, 4]).SkipWhile(o => o <= 100).ToArray());
        Assert.AreSequenceEqual([3, 4], new Linq([1, 2, 3, 4]).SkipWhile(o => o <= 2).ToArray());
    });

    it("Sum", () => {
        Assert.AreEqual(0, new Linq([]).Sum());
        Assert.AreEqual(10, new Linq([2, 2, 1, 5]).Sum());
        Assert.AreEqual(11, new Linq<any>([{ Value: 2 }, { Value: 4 }, { Value: 5 }]).Sum(o => o.Value));
    });

    it("Take", () => {
        Assert.AreSequenceEqual([], new Linq([1, 2, 3, 4]).Take(0).ToArray());
        Assert.AreSequenceEqual([1, 2], new Linq([1, 2, 3, 4]).Take(2).ToArray());
        Assert.AreSequenceEqual([1, 2, 3, 4], new Linq([1, 2, 3, 4]).Take(10).ToArray());
    });

    it("TakeWhile", () => {
        Assert.AreSequenceEqual([], new Linq([1, 2, 3, 4]).TakeWhile(o => o < 1).ToArray());
        Assert.AreSequenceEqual([1, 2], new Linq([1, 2, 3, 4]).TakeWhile(o => o <= 2).ToArray());
        Assert.AreSequenceEqual([1, 2, 3, 4], new Linq([1, 2, 3, 4]).TakeWhile(o => o < 100).ToArray());
    });

    it("Union", () => {
        Assert.AreSequenceEqual([], new Linq([]).Union([]).ToArray());
        Assert.AreSequenceEqual([1, 2, 3], new Linq([1, 2]).Union([2, 3]).ToArray());
        Assert.AreSequenceEqual([1, 3, 2], new Linq([1, 3]).Union([2, 3]).ToArray());
    });

    it("Where", () => {
        Assert.AreSequenceEqual([], new Linq([1, 2]).Where(o => o > 100).ToArray());
        Assert.AreSequenceEqual([2], new Linq([1, 2]).Where(o => o > 1).ToArray());
    });

    it("Zip", () => {
        Assert.AreSequenceEqual(["1 one"], new Linq([1]).Zip(["one", "two"], (o, i) => o + " " + i).ToArray());
        Assert.AreSequenceEqual(["1 one", "2 two"], new Linq([1, 2]).Zip(["one", "two"], (o, i) => o + " " + i).ToArray());
        Assert.AreSequenceEqual(["1 one", "2 two"], new Linq([1, 2, 3]).Zip(["one", "two"], (o, i) => o + " " + i).ToArray());
    });

});
