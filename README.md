[![Build Status](https://travis-ci.org/brunolm/LinqSharp.svg?branch=master)](https://travis-ci.org/brunolm/LinqSharp)

# linqsharp

LinqSharp is a NodeJS implementation of .NET's Linq.

Installation:

```
npm i linqsharp -S
```

Usage:

```
import Linq from "assertsharp"; // TS or Babel
var Linq = require("assertsharp").default; // ES5-
```

# TypeScript definition

A TypeScript definition file is:

```
declare module "linqsharp"
{
    export namespace AssertSharp {
        interface IEqualityComparer<T> {
            Equals(x: T, y: T): boolean;
            GetHashCode(obj: T): number;
        }
        interface IGrouping<TKey, T> {
            Key: TKey;
            Elements: T[];
        }
        function GetHashCode(e: any): any;
        function StringifyNonCircular(obj: any): any;
    }
    class Linq<T> {
        private a;
        constructor(a?: T[]);
        Aggregate<TResult>(func: (previous: T, next: T) => TResult, initialValue?: T): T;
        All(predicate: (value: T) => boolean): boolean;
        Any(predicate: (value: T) => boolean): boolean;
        Average(selector?: (value: T) => number): number;
        Concat(array: T[]): Linq<T>;
        Contains(value: T, comparer?: AssertSharp.IEqualityComparer<T>): boolean;
        Count(selector?: (value: T) => boolean): number;
        Distinct(comparer?: AssertSharp.IEqualityComparer<T>): Linq<T>;
        DistinctBy<U>(selector: (e: T) => U, comparer?: AssertSharp.IEqualityComparer<T>): Linq<T>;
        ElementAt(index: number): T;
        ElementAtOrDefault(index: number, defaultValue: T): T;
        Except(except: T[], comparer?: AssertSharp.IEqualityComparer<T>): Linq<T>;
        First(selector?: (e: T) => boolean): T;
        FirstOrDefault(selector?: (e: T) => boolean, defaultValue?: T): T;
        ForEach(callback: (e: T, index: number) => any): void;
        GroupBy<TKey, TElement>(keySelector: (e: T) => TKey, elementSelector?: (e: T) => TElement, comparer?: AssertSharp.IEqualityComparer<TKey>): Linq<any>;
        IndexOf(e: T, comparer?: AssertSharp.IEqualityComparer<T>): number;
        Intersect(array: T[], comparer?: AssertSharp.IEqualityComparer<T>): Linq<T>;
        Join<TInner, TKey, TResult>(array: TInner[], outerKeySelector: (e: T) => TKey, innerKeySelector: (e: TInner) => TKey, resultSelector: (outer: T, inner: TInner) => TResult, comparer?: AssertSharp.IEqualityComparer<TKey>): Linq<TResult>;
        Last(predicate?: (e: T) => boolean): T;
        LastOrDefault(predicate?: (e: T) => boolean, defaultValue?: T): T;
        Max<TResult>(selector?: (e: T) => TResult): TResult;
        Min<TResult>(selector?: (e: T) => TResult): TResult;
        OrderBy<TKey>(keySelector: (e: T) => TKey, comparer?: (a: TKey, b: TKey) => number): Linq<T>;
        OrderByDescending<TKey>(keySelector: (e: T) => TKey, comparer?: (a: TKey, b: TKey) => number): Linq<T>;
        Reverse(): Linq<T>;
        Select<TResult>(selector: (e: T, i?: number) => TResult): Linq<TResult>;
        SelectMany<TResult>(selector: (e: T) => T[], resultSelector?: (e: T) => TResult): Linq<TResult>;
        SequenceEqual(second: T[], comparer?: (a: T, b: T) => boolean): boolean;
        Single(predicate?: (e: T) => boolean): T;
        SingleOrDefault(predicate?: (e: T) => boolean, defaultValue?: T): T;
        Skip(count: number): Linq<T>;
        SkipWhile(predicate: (e: T) => boolean): Linq<T>;
        Sum(selector?: (value: T) => number): number;
        Take(count: number): Linq<T>;
        TakeWhile(predicate: (e: T) => boolean): Linq<T>;
        Union(second: T[], comparer?: AssertSharp.IEqualityComparer<T>): Linq<T>;
        Where(selector: (value: T) => boolean): Linq<T>;
        Zip<TInner, TResult>(array: TInner[], resultSelector: (o: T, i: TInner) => TResult): Linq<TResult>;
        ToArray(): T[];
    }
    export default Linq;
}
```
