// Type definitions for linqsharp
// Project: https://www.npmjs.com/package/linqsharp
// Definitions by: Bruno Leonardo Michels <https://github.com/brunolm>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 * LinqSharp module defines a helper class with
 * .NET's Linq methods.
 * 
 * @module linqsharp
 */
declare module "linqsharp"
{
    export namespace AssertSharp {
        /**
         * Defines methods to support the comparison of objects for equality.
         * 
         * {T} The type of objects to compare.
         */
        interface IEqualityComparer<T> {
            Equals(x: T, y: T): boolean;
            GetHashCode(obj: T): number;
        }

        /**
         * Represents a collection of objects that have a common key.
         * 
         * {TKey} The type of the key.
         * {T} The type of the values.
         */
        interface IGrouping<TKey, T> {
            Key: TKey;
            Elements: T[];
        }
        
        /**
         * Gets the HashCode of the object.
         * 
         * @param e Object to compute hash.
         * @returns A computed HashCode for the object. 
         */
        function GetHashCode(e: any): any;
        
        /**
         * Transforms a object into a string replacing circular
         * references by reference tokens.
         * 
         * @param obj Object to convert to string.
         * @returns {string} String representation of the object.
         */
        function StringifyNonCircular(obj: any): string;
    }
    
    /**
     * Wrapper class for an array that provides Linq functionallity.
     * 
     * @class Linq<T>
     */
    class Linq<T> {
        /** {T[]} Internal array reference. */
        private a;
        
        /**
         * Creates a new instance holding an array of <T>.
         * @constructor
         * 
         * @param {Array} a Array.
         */
        constructor(a?: T[]);

        /**
         * Applies an accumulator function over a sequence.
         * 
         * @param {Function} func An accumulator function to be
         * invoked on each element.
         * @param {T} [initialValue] The initial accumulator value.
         * 
         * @throws Error if array is empty.
         * 
         * @returns {T} The final accumulator value.
         */
        Aggregate<TResult>(func: (previous: T, next: T) => TResult, initialValue?: T): T;
        
        /**
         * Determines whether all elements of a sequence satisfy a condition.
         *
         * @param {Function} predicate A function to test each element for a condition.
         * 
         * @returns {boolean} true if every element of the source sequence passes the test in the specified
         * predicate, or if the sequence is empty; otherwise, false.
         */
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